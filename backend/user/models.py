from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import timedelta


# Choice definitions
EDUCATION_LEVEL_CHOICES = [
    ("10_PASS", "10th Pass"),
    ("11_PUR", "Pursuing 11th"),
    ("12_PASS", "12th Pass"),
    ("12_PUR", "Pursuing 12th"),
    ("GRAD_PUR", "Pursuing Graduation"),
    ("GRAD", "Graduated"),
    ("OTHER", "Other"),
]

LEARNING_STYLE_CHOICES = [
    ("VISUAL", "Visual (learn by seeing)"),
    ("AUDITORY", "Auditory (learn by hearing)"),
    ("READ_WRITE", "Reading/Writing (learn by reading/writing)"),
    ("KINESTHETIC", "Kinesthetic (learn by doing)"),
    ("MIXED", "Mixed/No strong preference"),
]

BOARD_OF_EDUCATION_CHOICES = [
    ("CBSE", "CBSE"),
    ("ICSE", "ICSE"),
    ("STATE", "State Board"),
    ("IB", "International Baccalaureate (IB)"),
    ("IGCSE", "IGCSE/Cambridge"),
    ("OTHER", "Other"),
]

GENDER_CHOICES = [
    ("M", "Male"),
    ("F", "Female"),
    ("O", "Other"),
    ("N", "Prefer Not to Say"),
]

LANGUAGE_PREFERENCES_CHOICES = [
    ("EN", "English"),
    ("HI", "Hindi"),
   
]

PREFERRED_TIME_CHOICES = [
    ("MORNING", "Morning"),
    ("AFTERNOON", "Afternoon"),
    ("EVENING", "Evening"),
    ("NIGHT", "Night"),
]

LEARNING_PACE_CHOICES = [
    ("SLOW", "Slow"),
    ("MEDIUM", "Medium"),
    ("FAST", "Fast"),
]

WORK_ENVIRONMENT_CHOICES = [
    ("CORPORATE", "Corporate"),
    ("STARTUP", "Startup"),
    ("GOVT", "Government"),
    ("FREELANCE", "Freelance"),
    ("NO_PREF", "No Preference"),
]

# Example related models for ManyToMany fields (customize these as needed)
class CareerField(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Subject(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Skill(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Badge(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=200)

    def __str__(self):
        return self.name

# Main Student model
class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # To display the username in the profile, not just the user ID.
       # --- Authentication ---
    # We will store the long-lived refresh token here.
    # It can be blank/null because a user is not "logged in" by default.
    refresh_token = models.TextField(blank=True, null=True)

    # --- Basic Information ---
    # Your 'current_education_level' is the only required field besides 'user',
    # so we'll set a default for it during registration.
    current_education_level = models.CharField(max_length=15, choices=EDUCATION_LEVEL_CHOICES, default='OTHER')
    

    # Basic Information
    phone_number = models.CharField(max_length=15, blank=True)
    date_of_birth = models.DateField(blank=True, null=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, blank=True)
    profile_picture = models.URLField(blank=True, null=True)

    # Education
    board_of_education = models.CharField(max_length=15, choices=BOARD_OF_EDUCATION_CHOICES, blank=True)
    school_name = models.CharField(max_length=100, blank=True)
    graduation_year = models.IntegerField(blank=True, null=True)
    academic_percentage = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    subjects_studied = models.ManyToManyField(Subject, related_name='students_studied', blank=True)
    favorite_subjects = models.ManyToManyField(Subject, related_name='students_favorite', blank=True)

    # Location
    city = models.CharField(max_length=50, blank=True)
    state = models.CharField(max_length=50, blank=True)
    country = models.CharField(max_length=50, default='India', blank=True)
    preferred_study_location = models.CharField(max_length=100, blank=True)

    # Language
    language_preferences = models.CharField(max_length=5, choices=LANGUAGE_PREFERENCES_CHOICES, blank=True)

    # Career Interests & Goals
    career_interests = models.ManyToManyField(CareerField, blank=True)
    dream_career = models.TextField(blank=True)
    preferred_work_environment = models.CharField(max_length=12, choices=WORK_ENVIRONMENT_CHOICES, blank=True)
    salary_expectations = models.CharField(max_length=25, blank=True)
    willing_to_relocate = models.BooleanField(default=False)

    # Skills & Strengths
    technical_skills = models.ManyToManyField(Skill, related_name='students_technical', blank=True)
    soft_skills = models.ManyToManyField(Skill, related_name='students_soft', blank=True)
    hobbies = models.CharField(max_length=200, blank=True)
    extracurricular_activities = models.TextField(blank=True)
    certifications = models.TextField(blank=True)

    # Learning Preferences
    preferred_learning_style = models.CharField(max_length=15, choices=LEARNING_STYLE_CHOICES, blank=True)
    study_time_preference = models.CharField(max_length=10, choices=PREFERRED_TIME_CHOICES, blank=True)
    learning_pace = models.CharField(max_length=10, choices=LEARNING_PACE_CHOICES, blank=True)
    group_vs_individual = models.CharField(max_length=15, blank=True)
    device_preference = models.CharField(max_length=15, blank=True)

    # Assessment & Personality
    personality_type = models.CharField(max_length=10, blank=True)
    learning_aptitude_score = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    interest_assessment_results = models.JSONField(blank=True, null=True)
    strengths_assessment = models.JSONField(blank=True, null=True)

    # Platform Specific Tracking
    onboarding_completed = models.BooleanField(default=False)
    registration_source = models.CharField(max_length=50, blank=True)
    parent_guardian_contact = models.CharField(max_length=15, blank=True)
    notifications_enabled = models.BooleanField(default=True)
    marketing_consent = models.BooleanField(default=False)

    # Progress & Engagement
    total_courses_enrolled = models.IntegerField(default=0)
    total_courses_completed = models.IntegerField(default=0)
    total_study_hours = models.DecimalField(max_digits=6, decimal_places=2, default=0)
    current_streak = models.IntegerField(default=0)
    badges_earned = models.ManyToManyField(Badge, blank=True)
    last_active = models.DateTimeField(auto_now=True)

    # Financial & Support
    family_income_range = models.CharField(max_length=30, blank=True)
    financial_aid_needed = models.BooleanField(default=False)
    support_system = models.CharField(max_length=50, blank=True)
    scholarship_eligible = models.BooleanField(default=False)

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} ({self.current_education_level})"




class PhoneOTP(models.Model):
    """
    Model to store OTPs for phone number verification.
    """
    phone_number = models.CharField(max_length=15, unique=True)
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)

    def is_expired(self):
        """
        Checks if the OTP has expired (valid for 10 minutes).
        """
        return self.created_at < timezone.now() - timedelta(minutes=10)

    def __str__(self):
        return f"OTP for {self.phone_number}"