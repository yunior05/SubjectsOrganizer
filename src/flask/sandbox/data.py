from bs4 import BeautifulSoup as bs
from flask import request
import urllib2 as uReq

def get_data(subject_id):
    url_cookies = 'http://www.utesa.edu/webutesa/recintos/Santiago/HomeSG.asp?reci=UTSAN'
    r = uReq.urlopen(url_cookies,timeout=5)
    cook = str(r.info()['Set-Cookie'])[:-7]
    print("subjectId", subject_id);
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
        def __init__(self, name, groups):
            self.name = name
            self.groups = groups

    class grupo:
        def __init__(self, id_g, time, classroom, virtual = False):
            self.id = id_g
            self.time = time
            self.classroom = classroom
            self.virutal = virtual

    subject_ob = materia(subject['name'], [])

    for g in subject['groups']:
        gup = grupo(g['id'], g['time'], g['classroom'])
        subject_ob.groups.append(gup)
    
    subject_ob.cicle = '32019'
    subject_ob.id_subject = subject_id
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