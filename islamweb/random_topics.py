from email.mime import base
import json
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By


#  folders json content
folders = [
    "index.php?pageno=1&page=lecview&sid=1074&read=0&lg=0&kh=0",
    "index.php?pageno=2&page=lecview&sid=1074&read=0&lg=0&kh=0",
    "index.php?pageno=3&page=lecview&sid=1074&read=0&lg=0&kh=0",
    "index.php?pageno=4&page=lecview&sid=1074&read=0&lg=0&kh=0",
    "index.php?pageno=5&page=lecview&sid=1074&read=0&lg=0&kh=0",
    "index.php?pageno=6&page=lecview&sid=1074&read=0&lg=0&kh=0",
    "index.php?pageno=2&page=lecview&sid=1074&read=0&lg=0&kh=0"
]

base_url = 'https://audio.islamweb.net/audio/'
# Set up Chrome options
chrome_options = webdriver.ChromeOptions()
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=chrome_options)


final_data = []


def scrapePage(obj):
    lessons = []
    link = base_url+obj
    driver.get(link)
    parent = driver.find_element(By.CLASS_NAME, 'soundlist')
    children = parent.find_elements(By.XPATH, './*')
    for child in children:
        title = child.find_element(By.TAG_NAME, 'h2').text
        playable_link_element = child.find_element(
            By.CLASS_NAME, 'playquranfiles')
        playable_link = playable_link_element.get_attribute('data-file')
        print(f'Title: {title}')
        print(f'Playable Link: {playable_link}')
        lesson = {'title': title, 'playable_link': playable_link}
        lessons.append(lesson)

    folder = {'link': obj}
    folder['lessons'] = lessons
    final_data.append(folder)


for i in folders:
    scrapePage(i)

with open('lessons_pagination.json', 'w', encoding='utf-8') as file:
    json.dump(final_data, file, ensure_ascii=False, indent=4)
