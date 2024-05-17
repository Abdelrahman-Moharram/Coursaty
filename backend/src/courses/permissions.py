from rest_framework.permissions import BasePermission, SAFE_METHODS
from .models import user_courses
class IsOwnCourse(BasePermission):
    message = "accessing course not allowed please buy the course first"
    def has_permission(self, request, view):
        
        if user_courses.objects.filter(course_id=view.kwargs['id'], user=request.user).first():
            return True
        return False