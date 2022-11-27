from stocks.models import Stock
from rest_framework import serializers


class StockSerializer(serializers.ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = Stock
        # Поля, которые мы сериализуем
        fields = ["pk", "company_name", "price", "count_videos","language", "Online", "tutors_count" ,"date_modified"]

# from stocks.models import Stock
# from rest_framework import serializers
#
#
# class StockSerializer(serializers.ModelSerializer):
#     class Meta:
#         # Модель, которую мы сериализуем
#         model = Stock
#         # Поля, которые мы сериализуем
#         fields = ["pk", "company_name", "price", "is_growing", "date_modified"]
