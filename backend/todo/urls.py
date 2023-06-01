from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import AuthRegister, AuthInfoGetView, UserList, TaskViewSet, FinishedViewSet


router = DefaultRouter()

router.register(r'task', TaskViewSet)
router.register(r'finished', FinishedViewSet)
router.register(r'myinfo', AuthInfoGetView)

urlpatterns = [
    path("", include(router.urls)),
    path("register/", AuthRegister.as_view()),
    path("userlist/", UserList.as_view()),
]
