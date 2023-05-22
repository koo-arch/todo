from rest_framework import serializers

from .models import User, Task, Finished

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "user_name",
            "password",
        )

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = (
            "id",
            "user",
            "task_name",
            "text",
            "date"
        )

class FinishedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Finished
        fields = (
            "id",
            "user",
            "finish_task",
            "text",
            "date",
        )