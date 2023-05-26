from rest_framework.routers import DefaultRouter

from . import views

user_router = DefaultRouter()
task_router = DefaultRouter()
finished_router = DefaultRouter()

user_router.register(r'', views.UserViewSet)
task_router.register(r'', views.TaskViewSet)
finished_router.register(r'', views.FinishedViewSet)
