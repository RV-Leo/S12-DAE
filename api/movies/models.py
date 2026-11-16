from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models


class Movie(models.Model):
    title = models.CharField(max_length=160)
    synopsis = models.TextField(blank=True)
    genre = models.CharField(max_length=80)
    age_rating = models.CharField(max_length=10, default="A")
    rating = models.DecimalField(
        max_digits=3,
        decimal_places=1,
        default=0,
        validators=[MinValueValidator(0), MaxValueValidator(10)],
    )
    duration_minutes = models.PositiveSmallIntegerField(default=90)

    class Meta:
        ordering = ["title"]

    def __str__(self):
        return self.title
