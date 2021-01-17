# -*- coding: utf-8 -*-
"""
Created on Sat Jan 16 16:04:47 2021

@author: cpatech007
"""

import socket
import psycopg2
# import pyodbc
# from sshtunnel import SSHTunnelForwarder

def setting(settingName):
    server = socket.gethostname()

    # tunnel = SSHTunnelForwarder(
    #     ('54.235.181.31', 22),
    #     ssh_username='seoadmin',
    #     ssh_private_key='C:\Data\Business\seoadmin.key',
    #     remote_bind_address=('localhost', 5432),
    #     local_bind_address=('localhost',5432)
    #     )
    # tunnel.daemon_forward_servers = True
    # tunnel.start()


    # cnxn = psycopg2.connect(
    #     database = "seoadmin",
    #     user="seoadmin",
    #     password="S30userDB!",
    #     host="localhost",
    #     port="5432"
    #     )

    cnxn = psycopg2.connect(
        database = "postgres",
        user="postgres",
        password="sa",
        host="localhost",
        port="5432"
        )

    cmdtxt = "select settingValue from seo.settings where settingLocale = '" + server + "' and settingName = 'image location'"
    
    cursor = cnxn.cursor()
    
    cursor.execute(cmdtxt)
    records = cursor.fetchall()
    for row in records:
        location = row[0]
    cnxn.commit()
    cursor.close()
    
    cnxn.close()
# tunnel.close()

    # print(location)
    # location = "C:\Data\Technology\SEO\Images"

    return location


