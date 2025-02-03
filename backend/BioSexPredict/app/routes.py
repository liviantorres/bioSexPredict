from flask import Blueprint, jsonify, request
from app.models import User
from app.database import db

user_bp = Blueprint('user_bp', __name__, url_prefix='/users')
ia_bp = Blueprint('ia_bp', __name__, url_prefix='/ia')

@user_bp.route('/', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users]), 200

@user_bp.route('/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    if user:
        return jsonify(user.to_dict()), 200
    return jsonify({"error": "User not found"}), 404

@user_bp.route('/', methods=['POST'])
def create_user():
    data = request.json

    # Verificar se name, email e password foram fornecidos
    if not data.get('name') or not data.get('email') or not data.get('password'):
        return jsonify({"error": "Name, email, and password are required"}), 400

    # Criar o novo usuário com name, email e password
    new_user = User(name=data['name'], email=data['email'])
    new_user.set_password(data['password'])  # Armazenar a senha com hash

    # Adicionar o usuário no banco de dados
    db.session.add(new_user)
    db.session.commit()

    return jsonify(new_user.to_dict()), 201


@user_bp.route('/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted"}), 200

