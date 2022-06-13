from flask import Flask, render_template, url_for, redirect, request, session
import os
import mysql.connector as mysql

conn = mysql.connect(
    host = 'localhost',
    user = 'root',
    passwd = '34261043',
    database = 'zero_company'
)

app = Flask(__name__)

app.static_folder = 'public'
app.static_url_path = '/public'

UPLOAD_PICTURE_FOLDER = os.path.join(os.path.dirname(__file__),"public/pic")

@app.route("/hi", methods=["POST"])
def Pic():
    conn.reconnect()
    cur = conn.cursor()
    sql_query = '''
    SELECT pic_id, title, thumbnailUrl
    FROM picstorage
    ORDER BY title
    '''
    cur.execute(sql_query)
    record = cur.fetchall()
    conn.close()
    return redirect('/')
    

if __name__=='__main__':
    app.run(debug=True)