from rest_framework.permissions import BasePermission, SAFE_METHODS
from courses.models import Course


class IsCourseInstructor(BasePermission):
    message = "course management not allowed except for course owner or admin"
    def has_permission(self, request, view):
        try:
            if Course.objects.filter(instructor=request.user, id=view.kwargs['course_id'],).first():
                return True
        except:
            pass
        return False

class IsCourseInstructorOrAdmin(BasePermission):
    message = "course management not allowed except for course owner or admin"
    def has_permission(self, request, view):
        try:
            if request.user.is_superuser:
                return True
            if Course.objects.filter(instructor=request.user, id=view.kwargs['course_id'],).first():
                return True
        except:
            pass
        return False