from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import AuthRegister, AuthInfoGetView, UserList, TaskViewSet, FinishedViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


router = DefaultRouter()

router.register(r'task', TaskViewSet)
router.register(r'finished', FinishedViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("auth/", include('djoser.urls')),
    path("auth/", include('djoser.urls.jwt')),
    path("register/", AuthRegister.as_view()),
]
