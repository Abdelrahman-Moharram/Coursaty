from django.urls import path
from .views import(
    course_info
)

app_name = 'instructor'

urlpatterns = [
    path("courses/<str:course_id>/manage/", course_info, name='course_info')
]
