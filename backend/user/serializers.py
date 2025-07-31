from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Student, PhoneOTP


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for the User model, updated for OTP registration.
    """
    phone_number = serializers.CharField(write_only=True)
    otp = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'phone_number', 'otp')
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        """
        Perform all validation checks in the correct order.
        """
        # Check 1: Ensure username and phone number are not already in use.
        if User.objects.filter(username=data['username']).exists():
            raise serializers.ValidationError("A user with this username already exists.")
        if Student.objects.filter(phone_number=data['phone_number']).exists():
            raise serializers.ValidationError("A user with this phone number already exists.")

        # Check 2: Validate the OTP
        otp_code = data.get('otp')
        phone = data.get('phone_number')

        try:
            otp_instance = PhoneOTP.objects.get(phone_number=phone)
        except PhoneOTP.DoesNotExist:
            raise serializers.ValidationError("OTP not found for this phone number. Please request one first.")

        if otp_instance.is_expired():
            raise serializers.ValidationError("OTP has expired.")

        if otp_instance.otp != otp_code:
            raise serializers.ValidationError("Invalid OTP.")

        return data

    def create(self, validated_data):
        # Data is already validated, so we can safely create the user.
        phone = validated_data.pop('phone_number')
        validated_data.pop('otp') # Remove OTP before creating user

        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        
        Student.objects.create(user=user, phone_number=phone)
        
        # Delete the used OTP
        PhoneOTP.objects.filter(phone_number=phone).delete()

        return user


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        # This method is called when a token is created for a user.
        token = super().get_token(user)

        # Add your custom claims to the token's payload.
        token['username'] = user.username
        # You can add any other data from the user model here.
        # For example: token['email'] = user.email

        return token
    



class StudentProfileSerializer(serializers.ModelSerializer):
    """
    Serializer for the Student profile model.
    This will handle retrieving and updating the user's detailed profile.
    """
    # To display the username in the profile, not just the user ID.
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Student
        # List all fields from the Student model you want to be viewable/editable.
        # Exclude the 'user' and 'refresh_token' fields from direct editing.
        fields = [
            'username',
            # Basic Information
            'phone_number',
            'date_of_birth',
            'gender',
            'profile_picture',

            # Education
            'current_education_level',
            'board_of_education',
            'school_name',
            'graduation_year',
            'academic_percentage',
            'subjects_studied',
            'favorite_subjects',

            # Location
            'city',
            'state',
            'country',
            'preferred_study_location',

            # Language
            'language_preferences',

            # Career Interests & Goals
            'career_interests',
            'dream_career',
            'preferred_work_environment',
            'salary_expectations',
            'willing_to_relocate',

            # Skills & Strengths
            'technical_skills',
            'soft_skills',
            'hobbies',
            'extracurricular_activities',
            'certifications',

            # Learning Preferences
            'preferred_learning_style',
            'study_time_preference',
            'learning_pace',
            'group_vs_individual',
            'device_preference',

            # Assessment & Personality
            'personality_type',
            'learning_aptitude_score',
            'interest_assessment_results',
            'strengths_assessment',

            # Platform Specific Tracking
            'onboarding_completed',
            'registration_source',
            'parent_guardian_contact',
            'notifications_enabled',
            'marketing_consent',

            # Progress & Engagement
            'total_courses_enrolled',
            'total_courses_completed',
            'total_study_hours',
            'current_streak',
            'badges_earned',

            # Financial & Support
            'family_income_range',
            'financial_aid_needed',
            'support_system',
            'scholarship_eligible',
            # ... add all other fields from your Student model here ...
        ]
