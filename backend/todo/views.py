from django.contrib.auth import authenticate
from django.db import transaction
from django.http import HttpResponseRedirect, Http404
from rest_framework import authentication, permissions, generics
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from rest_framework import status, viewsets, filters
from .models import CustomUser, Task
from .serializers import CustomUserSerializer, TaskSerializer
from .permissions import IsGreneralUser, IsSuperUser, IsMyselfToRetrieveUpdateDestroy

    

class AuthInfoGetView(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    def get_queryset(self):
        return CustomUser.objects.filter(id=self.request.user.id)
    

class UserList(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated, IsSuperUser,)
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer


class TaskViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def get_queryset(self):
        return Task.objects.filter(user_id=self.request.user.id, is_finished=False)


class FinishedViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def get_queryset(self):
        return Task.objects.filter(user_id=self.request.user.id, is_finished=True)