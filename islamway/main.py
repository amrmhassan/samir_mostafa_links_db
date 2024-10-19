import json
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.remote.webelement import WebElement


base_url = 'https://ar.islamway.net/lessons/scholar/582'
# Set up Chrome options
chrome_options = webdriver.ChromeOptions()
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=chrome_options)


def auto_scroll(driver, pause_time=2):
    last_height = driver.execute_script("return document.body.scrollHeight")

    while True:
        # Scroll down to the bottom
        driver.execute_script(
            "window.scrollTo(0, document.body.scrollHeight);")

        # Wait to load the new content
        time.sleep(pause_time)

        # Calculate new scroll height and compare with last scroll height
        new_height = driver.execute_script("return document.body.scrollHeight")

        if new_height == last_height:
            break

        last_height = new_height

    print("No more content to load.")


def getChildren():
    return driver.find_elements(By.CLASS_NAME, 'iw-panel')


def getChildData(child: WebElement):
    try:
        print('Here')
        time_element = child.find_element(
            By.TAG_NAME, 'div')
        text = time_element.text
        child_text = child.text
        time = time_element.get_attribute('data-rank')
        if time is None:
            pass
        print(time)
    except:
        pass


driver.get(base_url)
# auto_scroll(driver)
mediaContainers = getChildren()

for i in mediaContainers:
    getChildData(i)
