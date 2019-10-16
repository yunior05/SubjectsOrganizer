from bs4 import BeautifulSoup as bs
from flask import request
import urllib.request as uReq
import requests
import dates


def get_cookies(url):
    r = requests.get(url, timeout=5)
    for cookie in r.cookies:
        return str(cookie)[8:-20]


def get_data(subject_id):
    DAYS = ['L', 'MA', 'MI', 'J', 'V', 'S']
    url_cookies = 'http://www.utesa.edu/webutesa/recintos/Santiago/HomeSG.asp?reci=UTSAN'
    cook = get_cookies(url_cookies)
    url = "http://www.utesa.edu/webutesa/recintos/InfGen/Horarios2.asp?FDesde=%s&Fhasta=%s&x=65&y=5&SelCiclo=32019"
    opener = uReq.build_opener()  
    opener.addheaders.append(('Cookie', cook))
    url_e = (url % (subject_id, subject_id + "999"))
    page = opener.open(url_e)
    page_html = page.read()
    page.close()

    page_soup = bs(page_html, "html.parser")
    table = page_soup.find("td", {"height": "238"})
    rows = table.findAll("tr")
    subject = {'groups': []}

    for row in rows:
        data = row.findAll("td", {"valign": "middle"})
        count = 0
        group = {}
        for info in data:
            if count == 3:
                subject['name'] = info.text.strip()
            if count == 1:
                group['id'] = info.text.strip()
            if count == 5:
                group['time'] = info.text.strip()
            if count == 6:
                group['classroom'] = info.text.strip()
            count +=1
        if group:
            subject['groups'].append(group)

    class materia:
        def __init__(self, id_m, name, cycle, groups):
            self.id = id_m
            self.name = name
            self.cycle = cycle
            self.groups = groups

    class grupo:
        def __init__(self, id_g, date, classroom, virtual = False):
            self.id = id_g
            self.date = date
            self.classroom = classroom
            self.virutal = virtual

    class date:
        def __init__(self, day, start, finish):
            self.day = day
            self.start = start
            self.finish = finish

    subject_ob = materia(subject_id,  subject['name'], '32019', [])

    for g in subject['groups']:
        if (g['classroom'] == "VIRTU-"):
            gup = grupo(g['id'], [], "AULA VIRTUAL", True)
        else:
            date = dates.getAllDates(g['time'])
            gup = grupo(g['id'], date, g['classroom'])
        
        subject_ob.groups.append(gup)
    
    subject_ob.cycle = '32019'
    return subject_ob


def printData(value):
    data = get_data(value);
    print(data.name)
    for group in data.groups:
        print(group.id)
        print(group.time)
        print(group.classroom)
if __name__ == "__main__":
    ##example with id of ALGORITMOS COMPUTACIONALES INF117
    print(printData('INF117'))