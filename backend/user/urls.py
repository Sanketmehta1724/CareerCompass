from django.urls import path
from .views import register_user, login_view, logout_view , profile_view , send_otp

urlpatterns = [
    path('send-otp/', send_otp, name='send-otp'), # <-- Add this
    path('register/', register_user, name='register'),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
     path('profile/', profile_view, name='profile'), # <-- Add this line
]
