from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import User
# Create your models here.


class TrackRoots(models.Model):
    selfId = models.TextField(max_length=100)
    title = models.TextField(max_length=100)
    desc = models.TextField(max_length=6000)
    left = models.TextField(max_length=500)
    right = models.TextField(max_length=500)
    tags = ArrayField(models.CharField(max_length=500), null=True, blank=True)
    juniors = ArrayField(models.CharField(
        max_length=500), null=True, blank=True)
    seniors = ArrayField(models.CharField(
        max_length=500), null=True, blank=True)
    views = models.IntegerField(default=0)
    likes = models.IntegerField(default=0)

    def __str__(self):
        return str(self.title)


class TrackNodes(models.Model):
    selfId = models.TextField(max_length=100)
    root = models.ForeignKey(TrackRoots, on_delete=models.CASCADE)
    title = models.TextField(max_length=100)
    desc = models.TextField(max_length=6000)
    left = models.TextField(max_length=500)
    right = models.TextField(max_length=500)
    trackId = models.CharField(max_length=500, null=True, blank=True)
    hasTrack = models.BooleanField(default=False)
    tags = ArrayField(models.CharField(max_length=500), null=True, blank=True)
    views = models.IntegerField(default=0)
    likes = models.IntegerField(default=0)
    isTopic = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.root.title} : {self.title}"


class Mappings(models.Model):
    root = models.ForeignKey(TrackRoots, on_delete=models.CASCADE)
    l1 = models.TextField(max_length=500)
    l2 = models.TextField(max_length=500)

    def __str__(self):
        id1, id2 = self.l1[:-1], self.l2[:-1]
        l = TrackRoots.objects.filter(selfId=id1)
        r = TrackRoots.objects.filter(selfId=id2)

        if len(l) == 0:
            l = TrackNodes.objects.get(selfId=id1)
        else:
            l = l[0]
        if len(r) == 0:
            r = TrackNodes.objects.get(selfId=id2)
        else:
            r = r[0]

        return f"{l.title} --> {r.title}"


class Resources(models.Model):
    avatar = models.CharField(max_length=100)# choice
    username = models.CharField(max_length=500)
    poster = models.ImageField(upload_to='resourcesImages/')
    #course = models.ForeignKey(TrackRoots, on_delete=models.CASCADE)
    course = models.CharField(max_length=500)
    link = models.TextField(max_length=6000)
    price = models.CharField(max_length=50)
    type = models.CharField(max_length=500, null=True, blank=True)
    # shortName = models.CharField(max_length=500, null=True)
    difficulty = models.CharField(max_length=500, null=True)
    title = models.CharField(max_length=500)
    desc = models.TextField(max_length=6000)
    views = models.IntegerField(default=0)
    likes = models.IntegerField(default=0)
    tags = ArrayField(models.CharField(max_length=500, null=True), null=True, blank=True)

    def __str__(self):
        return self.title


class Feedbacks(models.Model):
    emailOrPhone = models.CharField(max_length=100, null=True)
    suggestedTrack = models.CharField(max_length=1000, null=True)
    feedback = models.TextField(max_length=6000)


class UserDetails(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    profession = models.CharField(max_length=100)

    def __str__(self):
        return self.user.username
