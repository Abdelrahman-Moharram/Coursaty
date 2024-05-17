from django.urls import path
from .views import (
    index,
    CourseDetails,
    Coursename,
    CourseLearn,
    purchase_course,
    UserCoursesList,
    GetCoursesFromDep,
    create_course
)
app_name = 'home'

urlpatterns = [
    path('', index, name="index"),
    path('create/', create_course, name="create_course"),
    path('user', UserCoursesList, name="user_courses"),
    path('<str:id>/', CourseDetails, name="CourseDetails"),
    path('<str:id>/learn', CourseLearn, name="CourseDetails"),
    path('<str:id>/name', Coursename, name="CourseName"),
    path('<str:id>/buy/stripe', purchase_course, name="CourseBuy"),
    path("cat/<str:id>", GetCoursesFromDep, name="GetCoursesFromDep"),
]
