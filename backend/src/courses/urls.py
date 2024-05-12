from django.urls import path
from .views import index, CourseDetails, Coursename, CourseLearn, Stripe_payment, UserCoursesList
app_name = 'home'

urlpatterns = [
    path('', index, name="index"),
    path('user', UserCoursesList, name="user_courses"),
    path('<str:id>/', CourseDetails, name="CourseDetails"),
    path('<str:id>/learn', CourseLearn, name="CourseDetails"),
    path('<str:id>/name', Coursename, name="CourseName"),
    path('<str:id>/buy/stripe', Stripe_payment, name="CourseBuy"),
]
