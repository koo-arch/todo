from rest_framework import serializers

from .models import UserManager, CustomUser, Task


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
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)
    updated_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)
    deadline = serializers.DateTimeField(format="%Y-%m-%d %H:%M")
    user_id = serializers.HiddenField(default=serializers.CurrentUserDefault())
    class Meta:
        model = Task
        fields = (
            "id",
            "user_id",
            "task_name",
            "comment",
            "created_at",
            "updated_at",
            "deadline",
            "is_finished",
        )