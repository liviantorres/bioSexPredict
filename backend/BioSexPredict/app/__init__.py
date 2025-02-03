from flask import Flask
from app.database import init_db
from app.routes import user_bp
from flask_migrate import Migrate  # Adiciona o Flask-Migrate
from app.database import db  # Importa o db

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    init_db(app)
    app.register_blueprint(user_bp)

    # Configura o Flask-Migrate
    Migrate(app, db)

    return app
