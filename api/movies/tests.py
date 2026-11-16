from django.test import TestCase
from rest_framework.test import APIClient

from .models import Movie


class MovieApiTests(TestCase):
    fixtures = ["movies.json"]

    def setUp(self):
        self.client = APIClient()

    def test_list_returns_movies(self):
        response = self.client.get("/api/movies/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 8)

    def test_create_and_delete_movie(self):
        response = self.client.post(
            "/api/movies/",
            {
                "title": "Nueva historia",
                "genre": "Drama",
                "age_rating": "A",
                "rating": 8.5,
                "duration_minutes": 105,
            },
            format="json",
        )
        self.assertEqual(response.status_code, 201)
        movie_id = response.data["id"]
        delete_response = self.client.delete(f"/api/movies/{movie_id}/")
        self.assertEqual(delete_response.status_code, 204)
        self.assertFalse(Movie.objects.filter(id=movie_id).exists())

    def test_blank_title_returns_api_validation_message(self):
        response = self.client.post(
            "/api/movies/",
            {"title": "", "genre": "Drama"},
            format="json",
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data["title"], ["Este campo es requerido."])


class CorsTests(TestCase):
    fixtures = ["movies.json"]

    def test_react_origin_is_allowed_and_other_origin_is_not(self):
        allowed = self.client.get(
            "/api/movies/",
            HTTP_ORIGIN="http://localhost:5173",
        )
        blocked = self.client.get(
            "/api/movies/",
            HTTP_ORIGIN="http://localhost:4173",
        )
        self.assertEqual(
            allowed.headers.get("Access-Control-Allow-Origin"),
            "http://localhost:5173",
        )
        self.assertIsNone(blocked.headers.get("Access-Control-Allow-Origin"))
