from rest_framework.permissions import BasePermission
from .models import CustomUser

class IsGreneralUser(BasePermission):
    def has_permission(self, request, view):

        if request.user.is_superuser:
            return True
        else:
            return False


class IsMyselfToRetrieveUpdateDestroy(BasePermission):

    def has_object_permission(self, request, view, obj):
        """自身のみがGET（詳細）・PUT・PATCH・DELETE許可"""
        return obj == request.user
