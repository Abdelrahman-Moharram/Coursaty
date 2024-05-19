from django.urls import path
from .views import(
    course_info,
    Course_Sections,
    delete_content
)

app_name = 'instructor'

urlpatterns = [
    path("courses/<str:course_id>/manage/", course_info, name='course_info'),
    path("courses/<str:course_id>/manage/sections/", Course_Sections, name='course_info'),
    path("contents/<str:content_id>/delete/", delete_content, name='delete_content')
]
