# -*- coding: utf-8 -*-
"""
Created on Wed Jan 20 20:49:33 2021

@author: cpatech007
"""


import socket
import psycopg2
import pyodbc
# from sshtunnel import SSHTunnelForwarder

def postLink(domain, site):
    
    ser = socket.gethostname()

    if ser == "SERVER2":
        cnxn = psycopg2.connect(
        database = "postgres",
        user="postgres",
        password="sa",
        host="localhost",
        port="5432"
        )
    else:
        cnxn = psycopg2.connect(
        database = "seoadmin",
        user="seoadmin",
        password="S30userDB!",
        host="localhost",
        port="5432"
        )

    try:
    # cmdtxt = "select settingValue from seo.settings where settingLocale = '" + ser + "' and settingName = 'image location'"
    
        cursor = cnxn.cursor()
        
        cursor.execute("CALL seo.PostDomains(%s, %s);", (domain, site))
        
        cnxn.commit()
        cursor.close()
        
        cnxn.close()
    except:
        exit()






def getImageLocation():
    
    ser = socket.gethostname()

    if ser == "SERVER2":
        cnxn = psycopg2.connect(
        database = "postgres",
        user="postgres",
        password="sa",
        host="localhost",
        port="5432"
        )
    else:
        cnxn = psycopg2.connect(
        database = "seoadmin",
        user="seoadmin",
        password="S30userDB!",
        host="localhost",
        port="5432"
        )

    cmdtxt = "select settingValue from seo.settings where settingLocale = '" + ser + "' and settingName = 'image location'"
    
    cursor = cnxn.cursor()
    
    location = cursor.execute(cmdtxt)
    
    cnxn.commit()
    cursor.close()
    
    cnxn.close()


    return location




