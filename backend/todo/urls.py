from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import AuthRegister, AuthInfoGetView, UserList, TaskViewSet, FinishedViewSet


task_router = DefaultRouter()
finished_router = DefaultRouter()

task_router.register(r'', TaskViewSet)
finished_router.register(r'', FinishedViewSet)

urlpatterns = [
    path("task/", include(task_router.urls)),
    path("finished/", include(finished_router.urls)),
    path("myinfo/", AuthInfoGetView.as_view()),
    path("register/", AuthRegister.as_view()),
    path("userlist/", UserList.as_view()),
]
