from rest_framework.viewsets import ReadOnlyModelViewSet

from .models import CustomUser, Task, Finished
from .serializers import CustomUserSerializer, TaskSerializer, FinishedSerializer


class UserViewSet(ReadOnlyModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer


class TaskViewSet(ReadOnlyModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class FinishedViewSet(ReadOnlyModelViewSet):
    queryset = Finished.objects.all()
    serializer_class = FinishedSerializer
