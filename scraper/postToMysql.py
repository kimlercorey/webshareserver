# -*- coding: utf-8 -*-
"""
Created on Sun Jul 19 15:25:21 2020

@author: cpatech007
"""

#import MySQLdb
import pyodbc
import sys

#v_site=sys.argv[1]
#v_url=sys.argv[2]


connection = pyodbc.connect(host='localhost',
                            database='sites',
                            port=5432,
                            user='poastgres',
                            password='sa')
mySql_insert_query = "INSERT INTO sitename (siteName, siteURL) VALUES ('SEO Marketing Pilot 2','" + sys.argv[1] + "')"
cursor = connection.cursor()
cursor.execute(mySql_insert_query)
connection.commit()
#print(cursor.rowcount, "Record inserted successfully into Laptop table")
cursor.close()

connection.close()