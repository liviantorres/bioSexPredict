from app.database import db
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)  # Armazenar o hash da senha

    def set_password(self, password):
        """Define a senha com hash."""
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        """Verifica se a senha fornecida é válida."""
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email
        }


class Individuo(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_user = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    sexo = db.Column(db.String(10), nullable=True, default="unknown")
    identificador = db.Column(db.String(100), nullable=False)
    descricao = db.Column(db.String(100), nullable=True)
    f_sa = db.Column(db.Float, nullable=False)
    f_lr = db.Column(db.Float, nullable=False)
    md_si = db.Column(db.Float, nullable=False) 
    f_sr = db.Column(db.Float, nullable=False)
    f_si = db.Column(db.Float, nullable=False)
    f_sl = db.Column(db.Float, nullable=False)
    e_ap = db.Column(db.Float, nullable=False)
    img = db.Column(db.String(100), nullable=True)
    


    def to_dict(self):
        return {
            "id": self.id,
            "img": self.img,
            "sexo": self.sexo,
            "identificador": self.identificador,
            "descricao": self.descricao,
            "f_sa": self.f_sa,
            "f_lr": self.f_lr,
            "md_si": self.md_si,
            "f_sr": self.f_sr,
            "f_si": self.f_si,
            "f_sl": self.f_sl,
            "e_ap": self.e_ap
        }