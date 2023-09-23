from django.shortcuts import redirect
from django.urls import reverse
from django.conf import settings
from rest_framework.response import Response

class AuthenticationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        self.exclude_paths=[
            reverse('login'),
            reverse('popular-destinations'),
            reverse('get-posts'),
            # reverse('comments'),
            '',
            'likes/',                
            reverse('restaurants',args=['<str:locationId>'])
        ]
        self.include_paths=[
            reverse('comment-delete',args=['<str:pk>'])
        ]                    
    def __call__(self, request):
        path = request.path
        if not request.user.is_authenticated:
            if path in self.include_paths:
                return Response({"message":"Failed"})
            if path not in self.exclude_paths:
                return redirect(reverse('login'))
            
        response = self.get_response(request)
        return response
