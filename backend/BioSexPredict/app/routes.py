from flask import Blueprint, jsonify, request
from app.models import User, Individuo
from app.database import db
import jwt
from datetime import datetime, timedelta
from functools import wraps
from app.ia import predict

auth_bp = Blueprint('auth_bp', __name__, url_prefix='/auth')
user_bp = Blueprint('user_bp', __name__, url_prefix='/users')
individual_bp = Blueprint('individual_bp', __name__, url_prefix='/individuals')

def generate_token(user_id):
    payload = {
        'user_id': user_id,
        'exp': datetime.utcnow() + timedelta(hours=1)
    }
    token = jwt.encode(payload, 'ce03a871-7d74-4992-a48c-6124cb43f617', algorithm='HS256')
    return token

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({"error": "Token is missing"}), 401
        try:
            data = jwt.decode(token, 'ce03a871-7d74-4992-a48c-6124cb43f617', algorithms=['HS256'])
            current_user = User.query.get(data['user_id'])
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token has expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token"}), 401
        return f(current_user, *args, **kwargs)
    return decorated

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"error": "Invalid credentials"}), 401

    token = generate_token(user.id)
    return jsonify({"token": token}), 200

@user_bp.route('/', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users]), 200

@user_bp.route('/<int:user_id>', methods=['GET'])
@token_required
def get_user(current_user, user_id):
    user = User.query.get(user_id)
    if user:
        return jsonify(user.to_dict()), 200
    return jsonify({"error": "User not found"}), 404

@user_bp.route('/', methods=['POST'])
def create_user():
    data = request.json
    if not data.get('name') or not data.get('email') or not data.get('password'):
        return jsonify({"error": "Name, email, and password are required"}), 400
    
    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        return jsonify({"error": "Email already exists"}), 400
    
    new_user = User(name=data['name'], email=data['email'])
    new_user.set_password(data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.to_dict()), 201

@user_bp.route('/<int:user_id>', methods=['PUT'])
@token_required
def update_user(current_user, user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.json
    if 'name' in data:
        user.name = data['name']
    if 'email' in data:
        user.email = data['email']
    if 'password' in data:
        user.set_password(data['password'])

    db.session.commit()
    return jsonify(user.to_dict()), 200

@user_bp.route('/<int:user_id>', methods=['DELETE'])
@token_required
def delete_user(current_user, user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted"}), 200

@individual_bp.route('/', methods=['POST'])
def create_individual(current_user):
    data = request.json
    
    if not data.get('identificator') or not data.get('f_sa') or not data.get('f_lr') or not data.get('md_si') or not data.get('f_sr') or not data.get('f_si') or not data.get('f_sl') or not data.get('e_ap'):
        return jsonify({"error": "Identificator, f_sa, f_lr, md_si, f_sr, f_si, f_sl, and e_ap are required"}), 400
    existing_individual = User.query.filter_by(identificator=data['identificator']).first()
    if existing_individual:
        return jsonify({"error": "Identificator already exists"}), 400
    
    f_sa= data.get('f_sa')
    f_lr= data.get('f_lr')
    md_si= data.get('md_si')
    f_sr= data.get('f_sr')
    f_si= data.get('f_si')
    f_sl= data.get('f_sl')
    e_ap= data.get('e_ap')
    
    sex_prediction = predict(f_sa, f_lr, md_si, f_sr, f_si, f_sl, e_ap)
    
    new_individual = Individuo(identificator=data['identificator'], sexo=sex_prediction, descricao=data['descricao'], f_sa=data['f_sa'], f_lr=data['f_lr'], md_si=data['md_si'], f_sr=data['f_sr'], f_si=data['f_si'], f_sl=data['f_sl'], e_ap=data['e_ap'], img=data['img'], id_user=current_user.id)
    db.session.add(new_individual)
    db.session.commit()
    return jsonify(new_individual.to_dict()), 201

#listar todos os individuos de um usuário
@individual_bp.route('/', methods=['GET'])
@token_required
def get_individuals(current_user):
    individuals = Individuo.query.filter_by(id_user=current_user.id).all()
    return jsonify([individual.to_dict() for individual in individuals]), 200

#listar os dados de apenas um individuo do usuário
@individual_bp.route('/<int:individual_id>', methods=['GET'])
@token_required
def get_individual(current_user, individual_id):
    individual = Individuo.query.filter_by(id_user=current_user.id, id=individual_id).first()
    if individual:
        return jsonify(individual.to_dict()), 200
    return jsonify({"error": "Individual not found"}), 404

#Editar os dados de um individuo
@individual_bp.route('/<int:individual_id>', methods=['PUT'])
@token_required
def update_individual(current_user, individual_id):
    individual = Individuo.query.filter_by(id_user=current_user.id, id=individual_id).first()
    if not individual:
        return jsonify({"error": "Individual not found"}), 404

    data = request.json
    if 'identificator' in data:
        individual.identificator = data['identificator']
    if 'sexo' in data:
        individual.sexo = data['sexo']
    if 'descricao' in data:
        individual.descricao = data['descricao']
    if 'f_sa' in data:
        individual.f_sa = data['f_sa']
    if 'f_lr' in data:
        individual.f_lr = data['f_lr']
    if 'md_si' in data:
        individual.md_si = data['md_si']
    if 'f_sr' in data:
        individual.f_sr = data['f_sr']
    if 'f_si' in data:
        individual.f_si = data['f_si']
    if 'f_sl' in data:
        individual.f_sl = data['f_sl']
    if 'e_ap' in data:
        individual.e_ap = data['e_ap']
    if 'img' in data:
        individual.img = data['img']
    
    db.session.commit()
    return jsonify(individual.to_dict()), 200

#excluir individuo
@individual_bp.route('/<int:individual_id>', methods=['DELETE'])
@token_required
def delete_individual(current_user, individual_id):
    individual = Individuo.query.filter_by(id_user=current_user.id, id=individual_id).first()
    if not individual:
        return jsonify({"error": "Individual not found"}), 404
    
    db.session.delete(individual)
    db.session.commit()
    return jsonify({"message": "Individual deleted"}), 200




