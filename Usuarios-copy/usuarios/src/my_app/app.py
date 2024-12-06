from flask import Flask, render_template, request, redirect, url_for, flash, send_file, jsonify
from pymongo import MongoClient
import qrcode
import io
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import base64
import tempfile
from PIL import Image
import fitz  # PyMuPDF
from pyzbar.pyzbar import decode
from cryptography.fernet import Fernet

app = Flask(__name__)
app.secret_key = 'supersecretkey'  # Necesario para usar mensajes flash

# Configurar la conexión a MongoDB
mongo_uri = "mongodb+srv://Steven:Steven123@cluster0.lxqrtx8.mongodb.net/mydatabase?retryWrites=true&w=majority"
client = MongoClient(mongo_uri)
db = client['Exx']
users = db['usuarios']
teachers = db['docentes']

# Generar una clave de cifrado (deberías guardar esta clave de manera segura)
key = Fernet.generate_key()
cipher_suite = Fernet(key)

@app.route('/')
def login():
    return render_template('login.html')

@app.route('/authenticate', methods=['POST'])
def authenticate():
    usuario = request.form['usuario']
    contraseña = request.form['contraseña']

    # Buscar el usuario en la base de datos
    user = users.find_one({'usuario': usuario, 'contraseña': contraseña})
    if not user:
        user = teachers.find_one({'usuario': usuario, 'contraseña': contraseña})

    if user:
        return "Login successful!"
    else:
        return "Invalid usuario or contraseña."

@app.route('/authenticate_qr', methods=['POST'])
def authenticate_qr():
    data = request.get_json()
    encrypted_data = data['encrypted_data']

    # Descifrar los datos del código QR
    try:
        decrypted_data = cipher_suite.decrypt(encrypted_data.encode()).decode()
        usuario, contraseña = decrypted_data.split(',')
        usuario = usuario.split(':')[1]
        contraseña = contraseña.split(':')[1]
    except Exception as e:
        return jsonify({'success': False, 'message': 'Error decrypting data.'})

    # Buscar el usuario en la base de datos
    user = users.find_one({'usuario': usuario, 'contraseña': contraseña})
    if not user:
        user = teachers.find_one({'usuario': usuario, 'contraseña': contraseña})

    if user:
        return jsonify({'success': True, 'message': 'Login successful!'})
    else:
        return jsonify({'success': False, 'message': 'Invalid usuario or contraseña.'})

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        usuario = request.form['usuario']
        contraseña = request.form['contraseña']
        correo = request.form['correo']
        nombre = request.form['nombre']
        tipo = request.form['tipo']

        # Verificar si el usuario, correo o nombre ya existen
        existing_user = users.find_one({'usuario': usuario})
        existing_teacher = teachers.find_one({'usuario': usuario})
        existing_email_user = users.find_one({'correo': correo})
        existing_email_teacher = teachers.find_one({'correo': correo})
        existing_name_user = users.find_one({'nombre': nombre})
        existing_name_teacher = teachers.find_one({'nombre': nombre})

        if existing_user or existing_teacher:
            flash("Username already exists. Please choose a different one.")
        elif existing_email_user or existing_email_teacher:
            flash("Email already exists. Please choose a different one.")
        elif existing_name_user or existing_name_teacher:
            flash("Name already exists. Please choose a different one.")
        else:
            # Insertar el nuevo usuario en la base de datos
            if tipo == 'usuario':
                users.insert_one({'usuario': usuario, 'contraseña': contraseña, 'correo': correo, 'nombre': nombre, 'tipo': tipo})
            elif tipo == 'docente':
                teachers.insert_one({'usuario': usuario, 'contraseña': contraseña, 'correo': correo, 'nombre': nombre, 'tipo': tipo})
            flash("Registration successful! You can now log in.")

            # Generar el código QR
            qr_data = f"usuario:{usuario},contraseña:{contraseña}"
            encrypted_data = cipher_suite.encrypt(qr_data.encode())
            qr = qrcode.QRCode(version=1, box_size=10, border=5)
            qr.add_data(encrypted_data.decode())
            qr.make(fit=True)
            img = qr.make_image(fill_color="black", back_color="white")

            # Guardar la imagen en un archivo temporal
            temp_img_path = tempfile.mktemp(suffix='.png')
            img.save(temp_img_path)

            # Guardar la imagen en un buffer de bytes
            img_byte_arr = io.BytesIO()
            img.save(img_byte_arr, format='PNG')
            img_byte_arr.seek(0)

            # Generar el PDF con el código QR
            pdf_byte_arr = io.BytesIO()
            c = canvas.Canvas(pdf_byte_arr, pagesize=letter)
            c.drawImage(temp_img_path, 100, 600, width=100, height=100)
            c.save()
            pdf_byte_arr.seek(0)

            # Convertir la imagen QR a base64 para mostrarla en el HTML
            img_base64 = base64.b64encode(img_byte_arr.getvalue()).decode('utf-8')

            # Renderizar la página de registro con el código QR y el enlace de descarga
            return render_template('register.html', qr_code=img_base64, pdf_file=base64.b64encode(pdf_byte_arr.getvalue()).decode('utf-8'))

    return render_template('register.html')

@app.route('/download_pdf')
def download_pdf():
    # Obtener el PDF del contexto de la solicitud
    pdf_file = request.args.get('pdf_file')
    if pdf_file:
        pdf_byte_arr = io.BytesIO(base64.b64decode(pdf_file))
        return send_file(pdf_byte_arr, as_attachment=True, download_name='qr_code.pdf', mimetype='application/pdf')
    else:
        return "Error: PDF file not found."

@app.route('/scan_qr')
def scan_qr():
    return render_template('scan_qr.html')

@app.after_request
def add_security_headers(response):
    response.headers['Content-Type'] = 'text/html'
    response.headers['X-Content-Type-Options'] = 'nosniff'
    return response

@app.route('/generate_qr', methods=['GET', 'POST'])
def generate_qr():
    if request.method == 'POST':
        usuario = request.form.get('usuario')
        contraseña = request.form.get('contraseña')

        # Buscar el usuario en la base de datos
        user = users.find_one({'usuario': usuario, 'contraseña': contraseña})
        if not user:
            user = teachers.find_one({'usuario': usuario, 'contraseña': contraseña})

        if user:
            # Generar el código QR
            qr_data = f"usuario:{usuario},contraseña:{contraseña}"
            encrypted_data = cipher_suite.encrypt(qr_data.encode())
            qr = qrcode.QRCode(version=1, box_size=10, border=5)
            qr.add_data(encrypted_data.decode())
            qr.make(fit=True)
            img = qr.make_image(fill_color="black", back_color="white")

            # Guardar la imagen en un archivo temporal
            temp_img_path = tempfile.mktemp(suffix='.png')
            img.save(temp_img_path)

            # Guardar la imagen en un buffer de bytes
            img_byte_arr = io.BytesIO()
            img.save(img_byte_arr, format='PNG')
            img_byte_arr.seek(0)

            # Convertir la imagen QR a base64 para mostrarla en el HTML
            img_base64 = base64.b64encode(img_byte_arr.getvalue()).decode('utf-8')

            # Renderizar la página con el código QR y el enlace de descarga
            return render_template('generate_qr.html', qr_code=img_base64)
        else:
            flash("Usuario o contraseña incorrectos.")
            return render_template('generate_qr.html')

    return render_template('generate_qr.html')

@app.route('/upload_qr', methods=['POST'])
def upload_qr():
    if 'file' not in request.files:
        flash('No file part')
        return redirect(request.url)
    file = request.files['file']
    if file.filename == '':
        flash('No selected file')
        return redirect(request.url)
    if file:
        # Guardar el archivo en un archivo temporal
        temp_file_path = tempfile.mktemp(suffix='.' + file.filename.split('.')[-1])
        file.save(temp_file_path)

        # Procesar el archivo para extraer el código QR
        qr_data = None
        if file.filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            img = Image.open(temp_file_path)
            qr_data = decode(img)
        elif file.filename.lower().endswith('.pdf'):
            pdf_document = fitz.open(temp_file_path)
            for page_num in range(len(pdf_document)):
                page = pdf_document.load_page(page_num)
                pix = page.get_pixmap()
                img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
                qr_data = decode(img)
                if qr_data:
                    break

        if qr_data:
            encrypted_data = qr_data[0].data.decode('utf-8')
            try:
                decrypted_data = cipher_suite.decrypt(encrypted_data.encode()).decode()
                usuario, contraseña = decrypted_data.split(',')
                usuario = usuario.split(':')[1]
                contraseña = contraseña.split(':')[1]
            except Exception as e:
                return jsonify({'success': False, 'message': 'Error decrypting data.'})

            # Buscar el usuario en la base de datos
            user = users.find_one({'usuario': usuario, 'contraseña': contraseña})
            if not user:
                user = teachers.find_one({'usuario': usuario, 'contraseña': contraseña})

            if user:
                return jsonify({'success': True, 'message': 'Login successful!'})
            else:
                return jsonify({'success': False, 'message': 'Invalid usuario or contraseña.'})
        else:
            return jsonify({'success': False, 'message': 'No QR code found in the uploaded file.'})

    return jsonify({'success': False, 'message': 'Invalid file.'})

if __name__ == '__main__':
    app.run(debug=True)
