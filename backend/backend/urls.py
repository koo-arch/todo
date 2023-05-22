from django.contrib import admin
from django.urls import path, include

from todo.urls import user_router, task_router, finished_router

api_urlpatterns = [
    path("users/", include(user_router.urls)),
    path("task/", include(task_router.urls)),
    path("finished/", include(finished_router.urls)),
]

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/", include(api_urlpatterns)),
]
