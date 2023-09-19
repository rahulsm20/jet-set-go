from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Item
from .serializers import ItemSerializer

class ItemCreateViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.item_data = {'itemName': 'A test item'}

    def test_create_item(self):
        response = self.client.post(reverse('item'), self.item_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Item.objects.count(), 1)
        self.assertEqual(Item.objects.get().itemName, 'Test Item')

class ItemDetailsViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.item = Item.objects.create(itemName='A test item description')

    def test_get_item_details(self):
        response = self.client.get(reverse('item-detail', args=[self.item.id]), format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], self.item.name)

    def test_update_item_details(self):
        updated_data = {'itemName': 'Updated description'}
        response = self.client.put(reverse('item-detail', args=[self.item.id]), updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Item.objects.get().itemName, 'Updated Item')

    def test_delete_item(self):
        response = self.client.delete(reverse('item-detail', args=[self.item.id]), format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Item.objects.count(), 0)
