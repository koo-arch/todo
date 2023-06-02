from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import AuthRegister, AuthInfoGetView, UserList, TaskViewSet, FinishedViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


router = DefaultRouter()

router.register(r'task', TaskViewSet)
router.register(r'finished', FinishedViewSet)
router.register(r'myinfo', AuthInfoGetView)

urlpatterns = [
    path("", include(router.urls)),
    path("token/", TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path("token/refresh", TokenRefreshView.as_view(), name='token_refresh'),
    path("register/", AuthRegister.as_view()),
    path("userlist/", UserList.as_view()),
]
