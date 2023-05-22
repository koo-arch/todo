from rest_framework.viewsets import ReadOnlyModelViewSet

from .models import User, Task, Finished
from .serializers import UserSerializer, TaskSerializer, FinishedSerializer


class UserViewSet(ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class TaskViewSet(ReadOnlyModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class FinishedViewSet(ReadOnlyModelViewSet):
    queryset = Finished.objects.all()
    serializer_class = FinishedSerializer