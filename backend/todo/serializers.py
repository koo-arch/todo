from rest_framework import serializers

from .models import UserManager, CustomUser, Task, Finished


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = (
            "id",
            "email",
            "password",
        )
    
    def create(self, validated_data):
        return CustomUser.objects.create_user(**validated_data)


class TaskSerializer(serializers.ModelSerializer):
    date = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
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
