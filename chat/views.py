from django.shortcuts import render, redirect
from chat.models import Room, Message
from django.http import HttpResponse, JsonResponse


# Create your views here.
def home(request):
    return render(request, 'home.html')


def room(request, room_info, user_info):
    room_details, created = Room.objects.get_or_create(name=room_info)
    return render(request, 'room.html', {
        'username': user_info,
        'room': room_info,
        'room_details': room_details
    })


def check_view(request):
    room_entity = request.POST['room_name']
    username = request.POST['username']
    if Room.objects.filter(name=room_entity).exists():
        return redirect('room', room_info=room_entity, user_info=username)
    else:
        new_room = Room.objects.create(name=room_entity)
        new_room.save()
        Room.save(new_room)
        return redirect('room', room_info=room_entity, user_info=username)


def send(request):
    message = request.POST['message']
    username = request.POST['username']
    room_id = request.POST['room_id']

    new_message = Message.objects.create(value=message, user=username, room=room_id)

    new_message.save()
    return HttpResponse('Message sent successfully')


def get_messages(request, room_name):
    # room_details = Room.objects.get(name=room_name)
    messages = Message.objects.filter(room__icontains=room_name)
    return JsonResponse({"messages": list(messages.values())})
