from rest_framework import serializers

from .models import CustomUser, Task, Finished


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = (
            "id",
            "password",
            "last_login",
            "is_superuser",
            "email",
            "is_staff",
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
