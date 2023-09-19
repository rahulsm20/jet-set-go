from django.contrib import admin
from .models import Item,Post,PopularDestination,UserPost,Comments

admin.site.register(Item)
admin.site.register(Post)
admin.site.register(PopularDestination)
admin.site.register(UserPost)
admin.site.register(Comments)