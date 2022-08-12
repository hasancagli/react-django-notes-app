from django.db import models

# Create your models here.

"""
auto_now vs auto_now_add

auto_now: updates value in every save
auto_now_add: it runs in initialization
"""

class Note(models.Model):
    body = models.TextField(null=True, blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateField(auto_now_add=True)
    
    def __str__(self):
        return self.body[0:50]