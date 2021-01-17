# -*- coding: utf-8 -*-
"""
Created on Sun Jan 17 00:08:26 2021

@author: cpatech007
"""



from selenium import webdriver
from selenium.webdriver import ActionChains
from selenium.webdriver.common.by import By
#import webdriver_manager

from webdriver_manager.chrome import ChromeDriverManager
import util
import requests
from bs4 import BeautifulSoup


# url = 'https://www.netflix.com/settings/viewed/GEAMYEOTVZDMLLKWKUG6X6YCYA'

# result = util.getFullPath(url)
# # print(savefinal)

# print(result)


url = 'http://www.genesisonesolutions.com'
base = util.getBaseURL(url)


res = requests.get(url)
html_page = res.content
soup = BeautifulSoup(html_page, 'html.parser')
for tag in soup.findAll('a', href=True):
    newlink = str(tag['href'])
    print(newlink)
    
    if not newlink.find("http"):
        biglink = base + '/' + newlink
        print(biglink)
    else:
        biglink = newlink
        print(biglink)
        
    print(biglink)
    position = biglink.find(base)
    
    if position > -1:
          
        options = webdriver.ChromeOptions()
        options.headless = True
        driver = webdriver.Chrome(ChromeDriverManager().install(), options=options)
        driver.implicitly_wait(10)
        
        driver.get(biglink)
        
        S = lambda X: driver.execute_script('return document.body.parentNode.scroll'+X)
        w = S('Width')
        h = S('Height')
        
        
        driver.set_window_size(w, h)
        
        locale = util.getFullPath(biglink)
        print(locale)

        driver.get_screenshot_as_file(locale)






