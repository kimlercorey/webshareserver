# -*- coding: utf-8 -*-
"""
Created on Wed Dec 30 09:10:13 2020

@author: cpatech007
"""



from urllib.parse import urlparse
from getSetting import setting
import os
import util
from webdriver_manager.chrome import ChromeDriverManager
from selenium import webdriver
from selenium.webdriver import ActionChains
from selenium.webdriver.common.by import By
import psycopg2



def getBaseURL(url):
    o = urlparse(url)
    baseurl = o.netloc
    baseurl = baseurl.replace('www.','')
    return baseurl


def getFullPath(url):
    
    baseDirectory = setting('image location')
    filename = nameFileDirectory(url)
    savedir = baseDirectory + '\\' + nameFileDirectory(getBaseURL(url))
    checkDirectory(savedir)
    savefinal = savedir + '\\' + filename + '.png'
       
    return savefinal
    

def nameFileDirectory(name):
    newname = name.replace('https://www.','').replace('http://www.','').replace('/','_').replace('.','_')
    return newname




def checkDirectory(directory):
    
    if not os.path.isdir(directory):
        os.mkdir(directory)
    return

  
    
def snapshotSiteAndSave(url):
# url = 'https://www.microsoft.com'
    
    options = webdriver.ChromeOptions()
    options.headless = True
    driver = webdriver.Chrome(ChromeDriverManager().install(), options=options)
    driver.implicitly_wait(10)
    
    driver.get(url)
    
    S = lambda X: driver.execute_script('return document.body.parentNode.scroll'+X)
    w = S('Width')
    h = S('Height')
    
    
    driver.set_window_size(w, h)
    
    locale = getFullPath(url)
    print(locale)
    
    
    driver.get_screenshot_as_file(locale)
   
    # options = webdriver.ChromeOptions()
    # options.headless = True
    # driver = webdriver.Chrome(ChromeDriverManager().install(), options=options)
    # driver.implicitly_wait(10)
    
    # driver.get(url)

    
    # S = lambda X: driver.execute_script('return document.body.parentNode.scroll'+X)
    # w = S('Width')
    # h = S('Height')
    
    
    # driver.set_window_size(w, h)
    
    
    # driver.get_screenshot_as_file(location)
    
    # return
    







