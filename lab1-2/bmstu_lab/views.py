from django.http import HttpResponse
from django.shortcuts import render

data = [
            {'title': 'Hunter x Hunter','descr': 'Ремейк аниме-сериала «Охотник х Охотник» 1999 года.','date': '2011' ,'id': 1},
            {'title': 'Chainsaw Man','descr': 'У Дэндзи есть мечта — жить мирной и счастливой жизнью, проводя время с любимой девушкой.','date': '2022', 'id': 2},
            {'title': 'Bleach: Sennen Kessen-hen','descr': 'Сообщество душ получает множество сообщений о тревоге:','date': '2021' , 'id': 3},
    ]

def GetAnimes(request):
    return render(request, 'animes.html', {'data': {
        'titles': data
    }})


def GetAnime(request, id):
    descr = 'desc'
    for i in data:
        if i.get('id') == id:
            descr = i.get('descr')

    return render(request, 'anime.html', {'data': {
        'id': id,
        'url': 'images/'+str(id)+'.jpg',
        'descr': descr,
    }})

# from bmstu_lab.models import Anime_title
#
# def animeList(request):
#     return render(request, 'Animes1.html', {'data' : {
#         'animes': Anime_title.objects.all()
#     }})
#
# def GetAnime1(request, id):
#     return render(request, 'Anime1.html', {'data' : {
#         'anime': Anime_title.objects.filter(id=id)[0]
#     }})