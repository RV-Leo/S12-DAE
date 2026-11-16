from rest_framework import serializers

from .models import Movie


class MovieSerializer(serializers.ModelSerializer):
    title = serializers.CharField(allow_blank=True)

    class Meta:
        model = Movie
        fields = [
            "id",
            "title",
            "synopsis",
            "genre",
            "age_rating",
            "rating",
            "duration_minutes",
        ]

    def validate_title(self, value):
        title = value.strip()
        if not title:
            raise serializers.ValidationError("Este campo es requerido.")
        return title
