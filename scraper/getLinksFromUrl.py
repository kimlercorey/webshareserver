# -*- coding: utf-8 -*-
"""
Created on Sun Sep 20 20:46:02 2020

@author: cpatech007
"""

#import sys
import requests
from bs4 import BeautifulSoup
import util


url = 'http://www.genesisonesolutions.com'
#sys.argv[1]
#'https://docs.microsoft.com/en-us/windows/python/beginners'


def processURL(url):
    
    res = requests.get(url)
    html_page = res.content
    soup = BeautifulSoup(html_page, 'html.parser')
    for tag in soup.findAll('a', href=True):
        newlink = str(tag['href'])
        
        if newlink.find(util.getBaseURL(newlink)) < 10:
            # print(locale)
            util.snapshotSiteAndSave(newlink)
    
    return









