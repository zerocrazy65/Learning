from flask import Flask, render_template, url_for, redirect, request, session
import os
import hashlib
import mysql.connector
#pip install mysql-connector-python


conn = mysql.connector(
    host = 'localhost',
    user = 'root',
    passwd = '34261043',
    database = 'zero_company'
)

app = Flask(__name__)

app.secret_key = "some thing"

template_folder = os.path.join(os.path.dirname(__file__), "templates")
#A + B, C:/WebApps-02/ + templates = C:/WebApps-02/templates/

app.static_folder = 'static'
app.static_url_path = '/static'

#File size not over 4MB
app.config['MAX_CONTENT_LENGTH'] = 4 * 1000 * 1000

#Upload Picture Folder
UPLOAD_PICTURE_FOLDER = os.path.join(os.path.dirname(__file__), "static/picture")

@app.route('/', methods=["GET"])
def index():
    session['username'] = ''
    session['audit'] = False
    return render_template('sign-in.html')

@app.route('/sign-up', methods=["GET"])
def sing_up():
    return render_template('sign-up.html')

@app.route('/sign-in', methods=["GET"])
def sign_in():
    return render_template('sign-in.html') #Model View Control

@app.route('/validate-sign-up', methods=["POST"])
def validate_sign_up():
    fname = request.form['fname']
    email = request.form['email']
    password = request.form['password']
    cfpassword = request.form['cfpassword']

    if fname !="" and email !="" and password !="" and password == cfpassword:
        password_encrpt = hashlib.md5(password.encode()).hexdigest()
        
        conn.reconnect()
        cur = conn.cursor()

        sql_insert = """
        INSERT INTO username(username,full_name,password,audit) 
        VALUES(%s,%s,%s,%s)
        """
        val = (email,fname,password_encrpt,1)
        
        cur.execute(sql_insert, val)
        conn.commit()
        conn.close()

        return render_template('sign-up-success.html')
    else:
        return redirect('/sign-up')

@app.route('/validate-sign-in', methods=["POST"])
def validate_sign_in():
    user = request.form['user']
    password = request.form['password']

    if user !="" and password !="":
        #true do something
        conn.reconnect()
        cur = conn.cursor()

        sql_query = '''
        SELECT password 
        FROM username
        WHERE username = %s
        '''
        val = (user,)

        cur.execute(sql_query, val)
        record = cur.fetchone() #(sdasdasdasdasdasd,Tongpool, Heeptaisong)
        conn.close()

        password_encrpt = hashlib.md5(password.encode()).hexdigest()
        if record[0] == password_encrpt:
            session['username'] = user
            session['audit'] = True
            return redirect('/main-program')
        else:
            return redirect('/sign-in')
    else:
        #false
        return redirect('/sign-in')

@app.route('/main-program', methods=["GET"])
def main():
    if session['audit'] == True:
        return render_template('main.html')
    else:
        return redirect('/sign-in')

@app.route('/sign-out', methods=["GET"])
def sign_out():
    session['username'] = ''
    session['audit'] = False
    return redirect('/sign-in')

@app.route('/users', methods=["GET"])
def users():
    conn.reconnect()
    cur = conn.cursor()
    sql_query = '''
    SELECT username,full_name,audit 
    FROM username
    '''
    cur.execute(sql_query)
    record = cur.fetchall() #(tongpool.h@gmail.com,Tongpool Heeptaisong,1)
    conn.close()
    return render_template('user.html', users=record)

@app.route('/user-delete/<user>', methods=["GET"])
def user_delete(user):
    conn.reconnect()
    cur = conn.cursor()
    sql_delete = '''
    DELETE FROM username
    WHERE username=%s
    '''
    val = (user,)
    cur.execute(sql_delete, val)
    conn.commit()
    conn.close()
    return redirect('/users')

@app.route('/user-add', methods=["GET"])
def user_add():
    return render_template('user-add.html')

@app.route('/user-add-post', methods=["POST"])
def user_add_post():
    fname = request.form['fname']
    user = request.form['user']
    password = request.form['password']
    cfpassword = request.form['cfpassword']

    if fname!="" and user!="" and password!="" and password==cfpassword:
        password_encrpt = hashlib.md5(password.encode()).hexdigest()
        conn.reconnect()
        cur = conn.cursor()
        sql_insert = '''
        INSERT INTO username(username,full_name,password,audit)
        VALUES(%s,%s,%s,%s)
        '''
        val = (user,fname,password_encrpt,1)
        cur.execute(sql_insert, val)
        conn.commit()
        conn.close()
        return redirect('/users')
    else:
        return redirect('/user-add')

@app.route('/user-edit/<user>', methods=["GET"])
def user_edit(user):
    conn.reconnect()
    cur = conn.cursor()
    sql_query = '''
    SELECT username,full_name
    FROM username
    WHERE username=%s
    '''
    val = (user,)
    cur.execute(sql_query, val)
    record = cur.fetchone() #('tongpool@gmail.com','Tongpool Heeptaisong')
    conn.close()
    return render_template('user-edit.html', name=record)

@app.route('/user-edit-post/<user>', methods=["POST"])
def user_edit_post(user):
    fname = request.form['fname']
    password = request.form['password']
    cfpassword = request.form['cfpassword']
    
    if password !="" and password == cfpassword:
        password_encrpt = hashlib.md5(password.encode()).hexdigest()
        sql_update = '''
        UPDATE username
        SET full_name=%s, password=%s
        WHERE username=%s
        '''
        val = (fname,password_encrpt,user)
    else:
        sql_update = '''
        UPDATE username
        SET full_name=%s
        WHERE username=%s
        '''
        val = (fname,user)

    conn.reconnect()
    cur = conn.cursor()
    cur.execute(sql_update, val)
    conn.commit()
    conn.close()
    return redirect('/users')

@app.route('/teams', methods=["GET"])
def teams():
    conn.reconnect()
    cur = conn.cursor()
    sql_query ='''
    SELECT team_id, fullname, email, picture, line_id, fb, mobile
    FROM team
    ORDER BY fullname
    '''
    cur.execute(sql_query)
    record = cur.fetchall()
    conn.close()
    return render_template('teams.html', names=record)

@app.route('/teams-add', methods=["GET"])
def teams_add():
    return render_template('teams-add.html')

@app.route('/teams-add-post', methods=["POST"])
def teams_add_post():
    fname = request.form['fname']
    email = request.form['email']
    fb = request.form['fb']
    line_id = request.form['line_id']
    mobile = request.form['mobile']

    f = request.files['picture']

    if fname !="" and email !="":
        if f.filename !="":
            f.save(os.path.join(UPLOAD_PICTURE_FOLDER, f.filename))
            sql_insert='''
            INSERT INTO team(fullname, email, picture, fb, line_id, mobile)
            VALUES(%s,%s,%s,%s,%s,%s)
            '''
            val = (fname,email,f.filename,fb,line_id,mobile)
        else:
            sql_insert='''
            INSERT INTO team(fullname, email, fb, line_id, mobile)
            VALUES(%s,%s,%s,%s,%s)
            '''
            val = (fname,email,fb,line_id,mobile)

        conn.reconnect()
        cur = conn.cursor()
        cur.execute(sql_insert, val)
        conn.commit()
        conn.close()
        return redirect('/teams')

    else:
        return redirect('/teams-add')

@app.route('/teams-delete/<team_id>', methods=["GET"])
def teams_delete(team_id):
    conn.reconnect()
    cur = conn.cursor()
    sql_delete = '''
    DELETE FROM team
    WHERE team_id=%s
    '''
    val = (team_id,)
    cur.execute(sql_delete, val)
    conn.commit()
    conn.close()
    return redirect('/teams')

@app.route('/teams-edit/<team_id>', methods=["GET"])
def teams_edit(team_id):
    conn.reconnect()
    cur = conn.cursor()
    sql_query ='''
    SELECT team_id, fullname, email, picture, line_id, fb, mobile
    FROM team
    WHERE team_id=%s
    '''
    val = (team_id,)
    cur.execute(sql_query, val)
    record = cur.fetchone()
    conn.close()
    return render_template('teams-edit.html', name=record)

@app.route('/teams-edit-post/<team_id>', methods=["POST"])
def teams_edit_post(team_id):
    fname = request.form['fname']
    email = request.form['email']
    fb = request.form['fb']
    line_id = request.form['line_id']
    mobile = request.form['mobile']

    f = request.files['picture']

    if f.filename !="":
        f.save(os.path.join(UPLOAD_PICTURE_FOLDER, f.filename))
        sql_update='''
        UPDATE team
        SET fullname=%s, email=%s, picture=%s, fb=%s, line_id=%s, mobile=%s
        WHERE team_id=%s
        '''
        val = (fname,email,f.filename,fb,line_id,mobile,team_id)
    else:
        sql_update='''
        UPDATE team
        SET fullname=%s, email=%s, fb=%s, line_id=%s, mobile=%s
        WHERE team_id=%s
        '''
        val = (fname,email,fb,line_id,mobile,team_id)

    conn.reconnect()
    cur = conn.cursor()
    cur.execute(sql_update, val)
    conn.commit()
    conn.close()
    return redirect('/teams')

@app.route('/gallery', methods=["GET"])
def gallery():
    conn.reconnect()
    cur = conn.cursor()
    sql_query ='''
    SELECT gallery_id, link, category, detail, image
    FROM gallery
    ORDER BY gallery_id
    '''
    cur.execute(sql_query)
    record = cur.fetchall()
    conn.close()
    return render_template('gallery.html', records=record)

@app.route('/gallery-add', methods=["GET"])
def gallery_add():
    return render_template('gallery-add.html')

@app.route('/gallery-add-post', methods=["POST"])
def gallery_add_post():

    link = request.form['link']
    category = request.form['category']
    detail = request.form['detail']

    f = request.files['image']

    if f.filename !="":
        f.save(os.path.join(UPLOAD_PICTURE_FOLDER, f.filename))
        sql_insert = '''
        INSERT INTO gallery(link,category,detail,image)
        VALUES(%s,%s,%s,%s)
        '''
        val = (link,category,detail,f.filename)
    else:
        sql_insert = '''
        INSERT INTO gallery(link,category,detail)
        VALUES(%s,%s,%s)
        '''
        val = (link,category,detail)

    conn.reconnect()
    cur = conn.cursor()
    cur.execute(sql_insert, val)
    conn.commit()
    conn.close()
    return redirect('/gallery')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)