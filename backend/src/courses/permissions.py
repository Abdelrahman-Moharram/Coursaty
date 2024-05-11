from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsOwnCourse(BasePermission):
    message = "accessing course not allowed please buy the course first"
    def has_permission(self, request, view):
        
        if request.user.courses.filter(id=view.kwargs['id']).first():
            return True
        return False