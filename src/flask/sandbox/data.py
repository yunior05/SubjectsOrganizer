from bs4 import BeautifulSoup as bs
from flask import request
import urllib.request as uReq
import requests
import dates
import models as Models

# Constants
URL = "http://www.utesa.edu/webutesa/recintos/InfGen/Horarios2.asp?FDesde=%s&Fhasta=%s&x=65&y=5&SelCiclo=%s"
URL_COOKIES = 'http://www.utesa.edu/webutesa/recintos/Santiago/HomeSG.asp?reci=UTSAN'
DAYS = ['L', 'MA', 'MI', 'J', 'V', 'S']

def get_cookies(url):
    r = requests.get(url, timeout=5)
    for cookie in r.cookies:
        return str(cookie)[8:-20]

def get_html(url, cookies):
    opener = uReq.build_opener()
    opener.addheaders.append(('Cookie', cookies))
    page = opener.open(url)
    page_html = page.read()
    page.close()
    return page_html

def get_data(subject_id, cycle, url = URL, subject_data = None):
    cookies = get_cookies(URL_COOKIES)

    if subject_data == None:
        url = (URL % (subject_id, subject_id + "999", cycle))
        subject_data = Models.Subject('', '', cycle, [])


    page_html = get_html(url, cookies)
    page_soup = bs(page_html, "html.parser")
    table = page_soup.select_one("body > table > tr:nth-of-type(7) > td:nth-of-type(1)")
    rows = table.findAll("tr")

    for row in rows:
        data = row.findAll("td", {"valign": "middle"})
        group_data = Models.Group('',[],'')

        if data:
            status = data[0].text.strip()
            subject_data.name = data[3].text.strip()
            group_data.id = data[1].text.strip()
            if 'Asig. Virtual' in data[5].text.strip():
                group_data.virtual = True
                group_data.classroom = "AULA VIRTUAL"
            else:
                group_data.classroom = data[6].text.strip()
                group_data.date = dates.getAllDates(data[5].text.strip())

            subject_data.groups.append(group_data)

    next_page = table.select_one("img[src*='../../images/PagSig.gif']")
    if next_page:
        new_url = 'http://www.utesa.edu' + next_page.parent.get('href')
        return get_data(subject_id, cycle, new_url, subject_data)
    else:
        return subject_data

if __name__ == "__main__":
    # example to print data of ESP301, and cycle: 32019
    data = get_data('ESP301', '32019')
    print('Subject name: %s' % data.name)
    print("=============================")
    for group in data.groups:
        print(
            'Group id: %s | Group Date: %s | Group Classroom: %s | VIRTUAL: %s' %
            (group.id, group.date, group.classroom, group.virtual))
        print("====================================================================")
    print("FINISH")
