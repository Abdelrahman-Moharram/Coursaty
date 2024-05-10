from django.urls import path
from .views import index, CourseDetails, Coursename
app_name = 'home'

urlpatterns = [
    path('', index, name="index"),
    path('<str:id>/', CourseDetails, name="CourseDetails"),
    path('<str:id>/name', Coursename, name="CourseDetails"),
]
