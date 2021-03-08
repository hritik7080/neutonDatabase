from django.shortcuts import render, redirect
from django.views.generic import View
import random
from databaseApp import models, serializers
from rest_framework.views import APIView
from rest_framework import status
from django.http import JsonResponse
from rest_framework.response import Response

# Create your views here.

allRoots = list()
allNodes = list()


def getMappingL2(obj):
    return obj.l2


def getMappingL1(obj):
    return obj.l1


def getSelfId(obj):
    return obj.selfId


def getRoots(id):

    return serializers.RootSerializer(models.TrackRoots.objects.get(selfId=id)).data


def globals():
    global allRoots
    global allNodes
    allRoots = list(map(getSelfId, models.TrackRoots.objects.all()))
    allNodes = list(map(getSelfId, models.TrackNodes.objects.all()))


class NewTrack(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'home.html')

    def post(self, request, *args, **kwargs):
        title = request.POST.get('name')
        desc = request.POST.get('desc')
        _id = ''
        for i in title.split():
            _id += i[0]
        _id += str(random.randint(100, 999))

        obj = models.TrackRoots.objects.create(
            selfId=_id, title=title, desc=desc, left=_id+'l', right=_id+'r')
        obj.save()

        request.session['newTrack'] = title
        request.session['newTrackId'] = _id
        request.session['nodes'] = 0

        return redirect('/addNode/')


class NewNode(View):
    def get(self, request, *args, **kwargs):
        # request.id =
        nodes = models.TrackNodes.objects.filter(
            root__selfId=request.session['newTrackId'])
        return render(request, 'addNodes.html', {"nodes": nodes})

    def post(self, request, *args, **kwargs):
        _id = request.session['newTrackId']
        selfId = _id+str(random.randint(100, 9999))
        root = models.TrackRoots.objects.get(selfId=_id)
        print("=====================", request.POST['parent'])
        parent = models.TrackNodes.objects.filter(
            root__selfId=request.session['newTrackId'], selfId=request.POST['parent'])

        if len(parent) == 0:
            parent = models.TrackRoots.objects.get(
                selfId=request.POST['parent'])
        else:
            parent = parent[0]

        title = request.POST.get('name')
        desc = request.POST.get('desc')
        left = selfId+'l'
        right = selfId+'r'
        node = models.TrackNodes.objects.create(
            selfId=selfId, root=root, title=title, desc=desc, left=left, right=right)
        node.save()

        if len(models.TrackNodes.objects.filter(root__selfId=request.session['newTrackId'])) == 1:

            _map = models.Mappings.objects.create(
                root=root, l1=parent.left, l2=node.left)
            _map.save()
            _map1 = models.Mappings.objects.create(
                root=root, l1=node.left, l2=node.right)
            _map1.save()
            _map2 = models.Mappings.objects.create(
                root=root, l1=node.right, l2=parent.right)
            _map2.save()

        else:
            parentRightMap = models.Mappings.objects.get(l2=parent.right)

            newMap = models.Mappings.objects.create(
                root=root, l1=parentRightMap.l1, l2=node.left)
            newMap.save()

            parentRightMap.l1 = node.right
            parentRightMap.save()

            connectBetween = models.Mappings.objects.create(
                root=root, l1=node.left, l2=node.right)
            connectBetween.save()

        return redirect('/addNode/')


def get():
    # node = {'ML970': [{'id': "ML970"}]}
    # internals = {'ML970': []}
    track = {}
    mappings = models.Mappings.objects.filter(root__selfId='ML970')
    nodes = models.TrackNodes.objects.filter(
        root=models.TrackRoots.objects.get(selfId='ML970'))

    l1 = list(map(getMappingL1, mappings))
    l2 = list(map(getMappingL2, mappings))
    maps = dict(zip(l1, l2))
    print(len(maps))

    # return maps

    parents = []
    parent = 'ML970l'
    parents.append(parent)
    child = maps[parent]
    c = 0
    while True:
        if c > 0 and len(parent) == 0:
            # parents.append(parent)
            # child = maps[parent]
            break
        c += 1
        parentId = parent[:-1]
        childId = child[:-1]
        if parentId not in track:
            track[parentId] = {'id': parentId, 'nodes': []}

        if childId not in track:
            track[childId] = {'id': childId, 'nodes': []}

            track[parentId]['nodes'].append(track[childId])

        # if child=='ML970r':
        #     break
        # else:
        _next = maps[child]
        if _next == 'ML970r':
            break

        if child[-1] == _next[-1] == 'l':
            parent = child
            parents.append(parent)
            child = maps[parent]

        elif child[-1] == 'l' and _next[-1] == 'r':
            child = _next

        elif child[-1] == 'r' and _next[-1] == 'r':
            parent = parents.pop()
            print(parents)
            parent = parents[-1]
            child = _next

        elif child[-1] == 'r' and _next[-1] == 'l':
            child = _next

        # print(track)

    return track['ML970']


def get1():
    # node = {'ML970': [{'id': "ML970"}]}
    # internals = {'ML970': []}
    track = {}
    mappings = models.Mappings.objects.filter(root__selfId='ML970')
    nodes = models.TrackNodes.objects.filter(
        root=models.TrackRoots.objects.get(selfId='ML970'))

    l1 = list(map(getMappingL1, mappings))
    l2 = list(map(getMappingL2, mappings))
    maps = dict(zip(l1, l2))
    print(len(maps))

    # return maps

    parents = []
    parent = 'ML970l'
    parents.append(parent)
    child = maps[parent]
    c = 0
    while True:
        if c > 0 and len(parent) == 0:
            # parents.append(parent)
            # child = maps[parent]
            break
        c += 1
        parentId = parent[:-1]
        childId = child[:-1]
        if parentId not in track:
            if len(models.TrackRoots.objects.filter(selfId=parentId)) == 0:
                obj = models.TrackNodes.objects.get(selfId=parentId)
                obj = dict(serializers.NodeSerializer(obj).data)
                obj['nodes'] = []
            else:
                obj = models.TrackRoots.objects.get(selfId=parentId)
                obj = dict(serializers.RootSerializer(obj).data)
                obj['nodes'] = []

            track[parentId] = obj

        if childId not in track:
            obj = models.TrackNodes.objects.get(selfId=childId)
            obj = dict(serializers.NodeSerializer(obj).data)
            obj['nodes'] = []

            track[childId] = obj

            track[parentId]['nodes'].append(track[childId])

        # if child=='ML970r':
        #     break
        # else:
        _next = maps[child]
        if _next == 'ML970r':
            break

        if child[-1] == _next[-1] == 'l':
            parent = child
            parents.append(parent)
            child = maps[parent]

        elif child[-1] == 'l' and _next[-1] == 'r':
            child = _next

        elif child[-1] == 'r' and _next[-1] == 'r':
            parent = parents.pop()
            print(parents)
            parent = parents[-1]
            child = _next

        elif child[-1] == 'r' and _next[-1] == 'l':
            child = _next

        # print(track)

    return track['ML970']


def getPreqs():

    mappings = models.Mappings.objects.filter(root__selfId='ML970')
    l1 = list(map(getMappingL1, mappings))
    l2 = list(map(getMappingL2, mappings))
    maps = dict(zip(l1, l2))
    node = models.TrackNodes.objects.get(selfId='ML9701527')
    revMaps = dict(zip(maps.values(), maps.keys()))
    preqs = set()
    child = node.left
    print(revMaps)

    while len(preqs) < 5:
        # print(revMaps[child])
        if child[:-1] == 'ML970':
            break
        preqs.add(revMaps[child][:-1])
        child = revMaps[child]

    return preqs


def getAdvance():
    mappings = models.Mappings.objects.filter(root__selfId='ML970')
    l1 = list(map(getMappingL1, mappings))
    l2 = list(map(getMappingL2, mappings))
    maps = dict(zip(l1, l2))
    node = models.TrackNodes.objects.get(selfId='ML970543')
    preqs = set()
    child = node.left
    print(maps)

    while len(preqs) < 5:
        # print(revMaps[child])
        if child[:-1] == 'ML970':
            break
        preqs.add(maps[child][:-1])
        child = maps[child]

    return preqs


class GetTrack(APIView):
    # def get(self, request, *args, **kwargs):
    #     track = list()
    #     mappings = models.Mappings.objects.filter(root__selfId='ML970')
    #     nodes = models.TrackNodes.objects.filter(
    #         root=models.TrackRoots.objects.get(selfId='ML970'))

    #     l1 = list(map(getMappingL1, mappings))
    #     l2 = list(map(getMappingL2, mappings))
    #     maps = dict(zip(l1, l2))
    #     print(maps)

    def get(self, request, *args, **kwargs):
        globals()
        rootId = request.GET['id']
        track = {}
        print(rootId, "========================================")
        if rootId in allRoots:
            obj = models.TrackRoots.objects.get(selfId=rootId)
            obj.views += 1
            obj.save()
            # models.TrackRoots.objects.get(selfId=rootId).update(likes=likes+1)
            mappings = models.Mappings.objects.filter(root__selfId=rootId)
        else:
            node = models.TrackNodes.objects.get(selfId=rootId)
            mappings = models.Mappings.objects.filter(
                root__selfId=node.root.selfId)
        # nodes = models.TrackNodes.objects.filter(
        #     root=models.TrackRoots.objects.get(selfId=rootId))

        l1 = list(map(getMappingL1, mappings))
        l2 = list(map(getMappingL2, mappings))
        maps = dict(zip(l1, l2))
        print(len(maps))

        # return maps

        parents = []
        parent = rootId+'l'
        parents.append(parent)
        child = maps[parent]
        c = 0
        while True:
            if c > 0 and len(parent) == 0:
                # parents.append(parent)
                # child = maps[parent]
                break
            c += 1
            parentId = parent[:-1]
            childId = child[:-1]
            if parentId not in track:
                if len(models.TrackRoots.objects.filter(selfId=parentId)) == 0:
                    obj = models.TrackNodes.objects.get(selfId=parentId)
                    obj = dict(serializers.NodeSerializer(obj).data)
                    obj['nodes'] = []
                else:
                    obj = models.TrackRoots.objects.get(selfId=parentId)
                    obj = dict(serializers.RootSerializer(obj).data)
                    obj['nodes'] = []

                track[parentId] = obj

            if childId not in track:
                obj = models.TrackNodes.objects.get(selfId=childId)
                obj = dict(serializers.NodeSerializer(obj).data)
                obj['nodes'] = []

                track[childId] = obj

                track[parentId]['nodes'].append(track[childId])

            # if child=='ML970r':
            #     break
            # else:
            _next = maps[child]
            if _next == rootId+'r':
                break

            if child[-1] == _next[-1] == 'l':
                parent = child
                parents.append(parent)
                child = maps[parent]

            elif child[-1] == 'l' and _next[-1] == 'r':
                child = _next

            elif child[-1] == 'r' and _next[-1] == 'r':
                parent = parents.pop()
                print(parents)
                parent = parents[-1]
                child = _next

            elif child[-1] == 'r' and _next[-1] == 'l':
                child = _next

            # print(track)
        output = track[rootId]
        if rootId in allRoots:
            root = models.TrackRoots.objects.get(selfId=rootId)
            if root.juniors:
                juniors = list(map(getRoots, root.juniors))
                output['juniors'] = juniors
            if root.seniors:
                seniors = list(map(getRoots, root.seniors))
                output['seniors'] = seniors

        return JsonResponse(output, safe=False)


class ResourcesView(APIView):
    def post(self, request, *args, **kwargs):
        track = models.TrackRoots.objects.get(
            selfId=request.POST.get('course'))
        obj = models.Resources(
            avatar=request.FILES.get('avatar'),
            username=request.POST.get('username'),
            poster=request.FILES.get('poster'),
            course=track,
            link=request.POST.get('link'),
            price=request.POST.get('price'),
            title=request.POST.get('title'),
            desc=request.POST.get('desc')
        )

        obj.save()

        return JsonResponse({'result': 'success'}, safe=False)

    def get(self, request, *args, **kwargs):
        if request.GET.get('id'):
            print("in id")
            objs = models.Resources.objects.filter(
                course__selfId=request.GET.get('id'))
            ouptput = []
            for i in objs:
                ouptput.append(serializers.ResourcesSerializer(i).data)
            return JsonResponse(ouptput, safe=False)
        output = []
        objs = models.Resources.objects.all()
        if len(objs) > 0:
            print('not in id')
            for i in objs:
                output.append(serializers.ResourcesSerializer(i).data)
                return JsonResponse(output, safe=False)
        else:
            print('in else')
            return Response({'result': 'No Resource Available'}, status=status.HTTP_404_NOT_FOUND)


class GetMetaView(APIView):
    def get(self, request, *args, **kwargs):
        output = []
        for i in models.TrackRoots.objects.all():
            output.append(serializers.RootSerializer(i).data)
        return JsonResponse(output, safe=False)


class TrackLikes(APIView):
    def get(self, request, *args, **kwargs):
        root = models.TrackRoots.objects.get(selfId=request.GET['id'])
        if request.GET['action'] == 'like':
            root.likes += 1
            root.save()
            return Response({'result': 'Liked'}, status=status.HTTP_200_OK)
        elif request.GET['action'] == 'dislike':
            root.likes -= 1
            root.save()
            return Response({'result': 'Disliked'}, status=status.HTTP_200_OK)
        else:
            return Response({'result': 'Unknown Action'}, status=status.HTTP_400_BAD_REQUEST)


class ResourceActions(APIView):
    def get(self, request, *args, **kwargs):
        resource=models.Resources.objects.get(id=request.GET['id'])
        if request.GET['action'] == 'like':
            resource.likes += 1
            resource.save()
            return Response({'result': 'Liked'}, status=status.HTTP_200_OK)
        elif request.GET['action'] == 'dislike':
            resource.likes -= 1
            resource.save()
            return Response({'result': 'Disliked'}, status=status.HTTP_200_OK)
        elif request.GET['action']=='view':
            resource.views += 1
            resource.save()
            return Response({'result': 'Viewed'}, status=status.HTTP_200_OK)
        else:
            return Response({'result': 'Unknown Action'}, status=status.HTTP_400_BAD_REQUEST)




