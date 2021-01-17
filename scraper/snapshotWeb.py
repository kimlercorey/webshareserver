# -*- coding: utf-8 -*-
"""
Created on Sun Jan 10 11:49:11 2021

@author: cpatech007
"""


from selenium import webdriver
from selenium.webdriver import ActionChains
from selenium.webdriver.common.by import By
#import webdriver_manager

from webdriver_manager.chrome import ChromeDriverManager
import util

url = 'https://www.food.com/recipe/super-crispy-thin-pizza-crust-290968'


options = webdriver.ChromeOptions()
options.headless = True
driver = webdriver.Chrome(ChromeDriverManager().install(), options=options)
driver.implicitly_wait(10)

driver.get(url)

S = lambda X: driver.execute_script('return document.body.parentNode.scroll'+X)
w = S('Width')
h = S('Height')


driver.set_window_size(w, h)

locale = util.getFullPath(url)
print(locale)


driver.get_screenshot_as_file(locale)
















