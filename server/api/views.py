from django.contrib.auth import logout
from rest_framework import status
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
import requests
from django.contrib.auth import authenticate, login
import xml.etree.ElementTree as ET
from django.shortcuts import redirect
from django.urls import reverse
from rest_framework import generics
from .models import Item, Post, PopularDestination, UserPost, Comments, PostLikes
from rest_framework.response import Response
import requests
from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator
import os
from rest_framework.views import APIView
from .serializers import (
    ItemSerializer,
    PostSerializer,
    PopularDestinationSerializer,
    UserRegistrationSerializer,
    UserPostSerializer,
    CommentSerializer,
    UserSerializer,
    LikeSerializer,
)


class ItemCreateView(generics.ListCreateAPIView):
    serializer_class = ItemSerializer

    def get_queryset(self):
        queryset = Item.objects.all()
        return queryset


class ItemDetails(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()


class FlightResponse(APIView):
    def get(
        self,
        request,
        travel_type,
        dept,
        arr,
        date,
        adult_no,
        child_no,
        infant_no,
        cabin_class,
        currency,
    ):
        apikey = os.environ.get("API_KEY")
        print(travel_type)
        adult_no, child_no, infant_no = str(adult_no), str(child_no), str(infant_no)
        try:
            response = requests.get(
                "https://api.flightapi.io/onewaytrip/"
                + apikey
                + "/"
                + dept
                + "/"
                + arr
                + "/"
                + date
                + "/"
                + adult_no
                + "/"
                + child_no
                + "/"
                + infant_no
                + "/"
                + cabin_class
                + "/"
                + currency
            )
            if response.status_code == 200:
                data = response.json()
                return Response(data, status=response.status_code)
            else:
                return Response(
                    {"error": "Failed to retrieve data"}, status=response.status_code
                )
        except Exception as e:
            return Response({"error": str(e)}, status=500)


class HomeView(APIView):
    def get(self, request):
        return Response("Travel API", 200)


class PostCreateView(generics.ListCreateAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        queryset = Post.objects.all()
        return queryset
class PostView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PostSerializer
    queryset = Post.objects.all()

@method_decorator(cache_page(60 * 15), name='dispatch')
class PopularDestinationView(generics.ListCreateAPIView):
    serializer_class = PopularDestinationSerializer
    queryset = PopularDestination.objects.all()


@method_decorator(cache_page(60 * 15), name='dispatch')
class PopularDestinationDetails(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PopularDestinationSerializer
    queryset = PopularDestination.objects.all()


def remove_namespace(tag):
    return tag.split("}", 1)[-1]


def xml_to_dict(element):
    result = {}
    for key, value in element.attrib.items():
        result[key] = value

    if element.text:
        result["_text"] = element.text

    for child in element:
        child_data = xml_to_dict(child)
        child_tag = remove_namespace(child.tag)
        if child_tag in result:
            if isinstance(result[child_tag], list):
                result[child_tag].append(child_data)
            else:
                result[child_tag] = [result[child_tag], child_data]
        else:
            result[child_tag] = child_data
    return result

@method_decorator(cache_page(60 * 15), name='dispatch')
class FlightsView(APIView):
    def get(self, request,departure,arrival,date):
        url = "https://timetable-lookup.p.rapidapi.com/TimeTable/"+departure+"/"+arrival+"/"+date

        headers = {
            "X-RapidAPI-Key": os.environ["FLIGHT_API_KEY"],
            "X-RapidAPI-Host": "timetable-lookup.p.rapidapi.com",
        }
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            data = response.text
            root = ET.fromstring(data)

            xml_dict = xml_to_dict(root)

            return Response(xml_dict["FlightDetails"][0:3], status=response.status_code)
        else:
            return Response(status=response.status_code)


class CityAutocomplete(APIView):
    def get(self, request, city):
        url = "https://world-airports-directory.p.rapidapi.com/v1/airports/" + city

        querystring = {"page": "1", "limit": "20", "sortBy": "AirportName:asc"}

        headers = {
            "X-RapidAPI-Key": os.environ["FLIGHT_API_KEY"],
            "X-RapidAPI-Host": "world-airports-directory.p.rapidapi.com",
        }

        response = requests.get(url, headers=headers, params=querystring)

        return Response(response.json(), status=response.status_code)

@method_decorator(cache_page(60 * 15), name='dispatch')
class GetLocationId(APIView):
    def get(self, request, keyword):
        url = "https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchLocation"

        querystring = {"query": keyword}

        headers = {
            "X-RapidAPI-Key": os.environ["FLIGHT_API_KEY"],
            "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
        }

        response = requests.get(url, headers=headers, params=querystring)

        data = response.json()
        return Response(data["data"][0]["locationId"], status=response.status_code)

@method_decorator(cache_page(60 * 15), name='dispatch')
class GetRestaurants(APIView):
    def get(self, request, locationId):
        url = "https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchRestaurants"

        querystring = {"locationId": locationId}

        headers = {
            "X-RapidAPI-Key": os.environ["FLIGHT_API_KEY"],
            "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
        }

        response = requests.get(url, headers=headers, params=querystring)

        data = response.json()
        return Response(data["data"]["data"], status=response.status_code)


def create_user(username, email, password):
    user = User.objects.create_user(username=username, email=email, password=password)
    return user


class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        username = serializer.validated_data["username"]
        email = serializer.validated_data["email"]
        password = serializer.validated_data["password"]

        user = create_user(username, email, password)

        return Response({"message": "User registration successful"}, status=201)


class TokenAuthenticationView(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        response_data = {"message": "Token is valid", "user": user.username}
        response = Response(response_data, status=status.HTTP_200_OK)
        response["Cache-Control"] = "no-store, max-age=0"
        return response

class UserLogoutView(APIView):
    def post(self, request):
        logout(request)
        return redirect(reverse('home')) 

class UserPostView(generics.ListCreateAPIView):
    serializer_class = UserPostSerializer
    queryset = UserPost.objects.all()

class UserPostDetailsView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserPostSerializer
    queryset = UserPost.objects.all()

class PostCommentsView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    queryset = Comments.objects.all()

class PostCommentsDetail(generics.ListAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        post = self.kwargs["post"]
        queryset = Comments.objects.filter(post=post)
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class GetUserIDView(generics.ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        username = self.kwargs["username"]
        queryset = User.objects.filter(username=username)
        return queryset

class CommentsDetails(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CommentSerializer
    queryset = Comments.objects.all()


class LikesView(generics.ListCreateAPIView):
    serializer_class = LikeSerializer
    queryset = PostLikes.objects.all()


class DeleteLikesView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = LikeSerializer
    queryset = PostLikes.objects.all()


class PostLikesView(generics.ListAPIView):
    serializer_class = LikeSerializer

    def get_queryset(self):
        post = self.kwargs["post"]
        queryset = PostLikes.objects.filter(post=post)
        return queryset

class LoginView(generics.CreateAPIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            response = Response({'message': 'Login successful'})
            response["Access-Control-Allow-Origin"] = "http://localhost:5173"  
            response["Access-Control-Allow-Credentials"] = "true"
            print(response)
            return response
        else:
            return Response({"error": "Invalid credentials"})
