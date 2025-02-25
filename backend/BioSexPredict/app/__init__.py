from flask import Flask
from flask_cors import CORS
from app.database import init_db
from app.routes import user_bp, auth_bp, individual_bp
from flask_migrate import Migrate
from app.database import db

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'ce03a871-7d74-4992-a48c-6124cb43f617' 
    init_db(app)
    CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})
    app.register_blueprint(user_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(individual_bp)
    Migrate(app, db)


    return app