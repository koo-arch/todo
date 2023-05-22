from django.db import models


class User(models.Model):
    user_name = models.CharField(max_length=50)
    password = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.user_name} {self.password}"

class Task(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    task_name = models.CharField(max_length=200)
    text = models.CharField(max_length=500)
    date = models.DateTimeField("date_published")
    
    def __str__(self):
        return f"{self.task_name} {self.text}"

class Finished(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    finish_task = models.CharField(max_length=200)
    text = models.CharField(max_length=500)
    date = models.DateTimeField("date_published")

    def __str__(self):
        return f"{self.finish_task} {self.text}"

