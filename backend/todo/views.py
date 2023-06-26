from django.contrib.auth import authenticate
from django.db import transaction
from django.http import HttpResponseRedirect, Http404
from rest_framework import authentication, permissions, generics
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from rest_framework import status, viewsets, filters
from .models import CustomUser, Task, Finished
from .serializers import CustomUserSerializer, TaskSerializer, FinishedSerializer
from .permissions import IsGreneralUser, IsSuperUser, IsMyselfToRetrieveUpdateDestroy


# ユーザ作成のView(POST)
class AuthRegister(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    @transaction.atomic
    def post(self, request, format=None):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

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
        return Task.objects.filter(user=self.request.user.id)
    

class FinishedViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Finished.objects.all()
    serializer_class = FinishedSerializer

    def get_queryset(self):
        return Finished.objects.filter(user=self.request.user.id)
