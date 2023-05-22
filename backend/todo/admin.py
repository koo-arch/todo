from django.contrib import admin
from .models import User, Task, Finished


admin.site.register(User)
admin.site.register(Task)
admin.site.register(Finished)