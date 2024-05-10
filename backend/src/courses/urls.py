from django.urls import path
from .views import index, CourseDetails
app_name = 'home'

urlpatterns = [
    path('', index, name="index"),
    path('<str:id>/', CourseDetails, name="CourseDetails"),
]
