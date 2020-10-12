# -*- coding: utf-8 -*-
"""
Created on Sun Sep 20 20:46:02 2020

@author: cpatech007
"""

#import sys
import requests
from bs4 import BeautifulSoup


url = 'https://docs.microsoft.com/en-us/windows/python/beginners'
#sys.argv[1]
#'https://docs.microsoft.com/en-us/windows/python/beginners'


def return_string(url):
    links = ""
    res = requests.get(url)
    html_page = res.content
    soup = BeautifulSoup(html_page, 'html.parser')
    for tag in soup.findAll('a', href=True):
        newlink = str(tag['href'])
        links += newlink + "\n"
    
    return links
