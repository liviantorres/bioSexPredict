from app import create_app
from app.models import User
from app.database import db

# Cria a aplicação Flask e ativa o contexto
app = create_app()

with app.app_context():
    # Lista os usuários
    users = User.query.all()
    for user in users:
        print(user.to_dict())
