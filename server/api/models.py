import uuid
from django.db import models
from django.contrib.auth.models import User

class Item(models.Model):
    item_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    itemName = models.CharField(max_length=100)

    def __str__(self)->str:
        return self.itemName
    
class Post(models.Model):
    post_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=100)
    image = models.ImageField(upload_to='post_images/')

class PopularDestination(models.Model):
    destination_id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    city_name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='pop_dests/')
    description = models.CharField(max_length=200,default=None)

class UserPost(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    image = models.ImageField(upload_to="user_posts/")
    likes = models.IntegerField(default=0,editable=True)
    caption=models.TextField(editable=True,blank=True)
class Comments(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    user = models.ForeignKey(User,on_delete=models.CASCADE,blank=False)
    content = models.CharField(max_length=200)
    post=models.ForeignKey(UserPost,on_delete=models.CASCADE,blank=False)  

class PostLikes(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    user = models.ForeignKey(User,on_delete=models.CASCADE,blank=False)
    post = models.OneToOneField(UserPost,on_delete=models.CASCADE,blank=False)