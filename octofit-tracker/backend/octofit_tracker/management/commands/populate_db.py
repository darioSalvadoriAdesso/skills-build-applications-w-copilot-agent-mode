from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from djongo import models

from octofit_tracker.models import Team, Activity, Leaderboard, Workout

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        User = get_user_model()
        # Cancella dati esistenti
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Crea squadre
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Crea utenti
        ironman = User.objects.create_user(username='ironman', email='ironman@marvel.com', password='password', first_name='Tony', last_name='Stark', team=marvel)
        captain = User.objects.create_user(username='captain', email='captain@marvel.com', password='password', first_name='Steve', last_name='Rogers', team=marvel)
        batman = User.objects.create_user(username='batman', email='batman@dc.com', password='password', first_name='Bruce', last_name='Wayne', team=dc)
        flash = User.objects.create_user(username='flash', email='flash@dc.com', password='password', first_name='Barry', last_name='Allen', team=dc)

        # Crea attività
        Activity.objects.create(user=ironman, type='Running', duration=30, calories=300)
        Activity.objects.create(user=captain, type='Cycling', duration=45, calories=400)
        Activity.objects.create(user=batman, type='Swimming', duration=60, calories=500)
        Activity.objects.create(user=flash, type='Running', duration=20, calories=250)

        # Crea workout
        Workout.objects.create(name='Full Body', description='Complete full body workout', duration=60)
        Workout.objects.create(name='Cardio Blast', description='High intensity cardio', duration=30)

        # Leaderboard
        Leaderboard.objects.create(user=ironman, points=1000)
        Leaderboard.objects.create(user=captain, points=900)
        Leaderboard.objects.create(user=batman, points=950)
        Leaderboard.objects.create(user=flash, points=1100)

        self.stdout.write(self.style.SUCCESS('Database popolato con dati di test!'))
