from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    
    # Configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///mentor.db')
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-key-change-in-production')
    
    # Initialize extensions
    db.init_app(app)
    CORS(app)
    
    # Register blueprints
    from app.routes import user_routes, mentor_routes, job_routes, progress_routes
    app.register_blueprint(user_routes.bp)
    app.register_blueprint(mentor_routes.bp)
    app.register_blueprint(job_routes.bp)
    app.register_blueprint(progress_routes.bp)
    
    # Create tables
    with app.app_context():
        db.create_all()
    
    return app
