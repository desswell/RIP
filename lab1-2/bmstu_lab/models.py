# from django.db import models
#
#
# class Anime_title(models.Model):
#     name = models.CharField(max_length=30)
#     description = models.CharField(max_length=255)
#
#     class Meta:
#         managed = True
#         db_table = 'animes'
#
# class Studios(models.Model):
#     name = models.CharField(max_length=50)
#     description = models.CharField(max_length=255)
#     rating = models.CharField(max_length=5)
#
#     class Meta:
#         managed = True
#         db_table = "studios"
#
# class Auth(models.Model):
#     name = models.CharField(max_length=20)
#     rating = models.CharField(max_length=10)
#     country = models.CharField(max_length=30)
#
#     class Meta:
#         managed = True
#         db_table = "auth"
