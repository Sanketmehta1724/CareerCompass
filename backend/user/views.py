from django.contrib.auth import authenticate
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
import cloudinary.uploader
from twilio.rest import Client
from twilio.base.exceptions import TwilioRestException # Import the specific exception
from django.utils import timezone

import random

from .models import Student,PhoneOTP
from .serializers import UserSerializer,MyTokenObtainPairSerializer,StudentProfileSerializer



@api_view(['POST'])
@permission_classes([AllowAny])
def send_otp(request):
    """
    Generates and sends an OTP to the user's phone number.
    Prevents sending a new OTP if a valid one already exists or if the phone number is already registered.
    """
    phone_number = request.data.get('phone_number')
    if not phone_number:
        return Response({'error': 'Phone number is required.'}, status=status.HTTP_400_BAD_REQUEST)

    # **NEW**: Check if phone number is already registered
    if Student.objects.filter(phone_number=phone_number).exists():
        return Response({'error': 'This phone number is already registered.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Check if a valid OTP already exists
        otp_instance = PhoneOTP.objects.get(phone_number=phone_number)
        if not otp_instance.is_expired():
            return Response({'error': 'An OTP has already been sent. Please wait before requesting a new one.'}, status=status.HTTP_400_BAD_REQUEST)
    except PhoneOTP.DoesNotExist:
        pass # No existing OTP, so we can proceed

    # Generate a 6-digit OTP
    otp = str(random.randint(100000, 999999))

    # Save or update the OTP in the database
    PhoneOTP.objects.update_or_create(
        phone_number=phone_number,
        defaults={'otp': otp, 'created_at': timezone.now()}
    )

    # Send OTP via Twilio
    try:
        client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
        message = client.messages.create(
            body=f'Your verification code is: {otp}',
            from_=settings.TWILIO_PHONE_NUMBER,
            to=phone_number
        )
        return Response({'success': 'OTP sent successfully.'}, status=status.HTTP_200_OK)
    except TwilioRestException as e:
        if e.code == 21211:
            return Response({'error': 'Invalid phone number. Please provide the number in E.164 format (e.g., +919876543210).'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Failed to send OTP. Please try again later.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




@api_view(['POST'])
@permission_classes([AllowAny]) # Anyone can register
def register_user(request):
    """
    Creates a new user and their associated Student profile.
    """
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        # Create the User instance
        user = serializer.save()
        
        # Now, create the associated Student profile.
        # We pass the newly created user to the 'user' field.
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    """
    Authenticates a user and returns access and refresh tokens
    with custom claims.
    """
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user is not None:
        try:
            student_profile = Student.objects.get(user=user)
        except Student.DoesNotExist:
            return Response({'error': 'User profile not found.'}, status=status.HTTP_404_NOT_FOUND)


        if student_profile.refresh_token:
            return Response({'error': 'You are already logged in.'}, status=status.HTTP_400_BAD_REQUEST)


        # Use the custom serializer to get tokens
        serializer = MyTokenObtainPairSerializer(data=request.data)
        
        try:
            # The serializer's validate method will run and add custom claims
            tokens = serializer.validate(request.data)
        except Exception:
             return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)


        # Save the refresh token to the Student model instance.
        student_profile.refresh_token = tokens['refresh']
        student_profile.save()

        return Response({
            'refresh': tokens['refresh'],
            'access': tokens['access'],
        })
    
    return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
@permission_classes([IsAuthenticated]) # Only authenticated users can log out
def logout_view(request):
    """
    Logs out a user by clearing their refresh token from the database.
    """
    try:
       
        user = request.user
        

        student_profile = Student.objects.get(user=user)


        if student_profile.refresh_token is None:
            return Response({'error': 'You are already logged out.'}, status=status.HTTP_400_BAD_REQUEST)
       
        student_profile.refresh_token = None
        student_profile.save()
        
        return Response({"success": "Successfully logged out."}, status=status.HTTP_204_NO_CONTENT)
    except Student.DoesNotExist:
         return Response({'error': 'User profile not found.'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PATCH']) 
@permission_classes([IsAuthenticated]) 
def profile_view(request):
    """
    Retrieve or update the logged-in user's profile.
    """
    try:
        student_profile = Student.objects.get(user=request.user)
    except Student.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = StudentProfileSerializer(student_profile)

    
        return Response(serializer.data)

    elif request.method == 'PATCH': 
       
        if 'profile_picture' in request.FILES:
            uploaded_file = request.FILES['profile_picture']

            # Upload to Cloudinary
            result = cloudinary.uploader.upload(uploaded_file)

            # Get the secure URL from Cloudinary response
            profile_picture_url = result.get('secure_url')

            # Save the Cloudinary URL instead of the file itself
            request.data._mutable = True  # If QueryDict is immutable
            request.data['profile_picture'] = profile_picture_url
        serializer = StudentProfileSerializer(student_profile, data=request.data, partial=True)
      
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
