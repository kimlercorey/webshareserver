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
import time

options = webdriver.ChromeOptions()
options.headless = True
driver = webdriver.Chrome(ChromeDriverManager().install(), options=options)
driver.implicitly_wait(10)

driver.get('https://cpe.furthered.com/')

S = lambda X: driver.execute_script('return document.body.parentNode.scroll'+X)
w = S('Width')
h = S('Height')


driver.set_window_size(w, h)


driver.get_screenshot_as_file('test.png')
















