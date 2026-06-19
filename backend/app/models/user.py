from app import db
from datetime import datetime
import json

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    name = db.Column(db.String(120), nullable=False)
    current_level = db.Column(db.String(50), default='beginner')  # beginner, intermediate, advanced
    years_coding = db.Column(db.Integer, default=0)
    current_skills = db.Column(db.JSON, default={})  # e.g., {'Python': 8, 'ML': 3, 'DL': 2}
    target_role = db.Column(db.String(120), default='AI Engineer')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    progress_logs = db.relationship('ProgressLog', backref='user', lazy=True, cascade='all, delete-orphan')
    learning_paths = db.relationship('LearningPath', backref='user', lazy=True, cascade='all, delete-orphan')
    
    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'name': self.name,
            'current_level': self.current_level,
            'years_coding': self.years_coding,
            'current_skills': self.current_skills,
            'target_role': self.target_role,
            'created_at': self.created_at.isoformat()
        }


class ProgressLog(db.Model):
    __tablename__ = 'progress_logs'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    skill = db.Column(db.String(120), nullable=False)
    hours_spent = db.Column(db.Integer, default=0)
    proficiency_level = db.Column(db.Integer, default=0)  # 0-10 scale
    projects_completed = db.Column(db.Integer, default=0)
    resources_used = db.Column(db.JSON, default=[])  # List of resources
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'skill': self.skill,
            'hours_spent': self.hours_spent,
            'proficiency_level': self.proficiency_level,
            'projects_completed': self.projects_completed,
            'resources_used': self.resources_used,
            'created_at': self.created_at.isoformat()
        }


class LearningPath(db.Model):
    __tablename__ = 'learning_paths'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    path_name = db.Column(db.String(200), nullable=False)
    skills_to_learn = db.Column(db.JSON, default=[])
    timeline_weeks = db.Column(db.Integer, default=12)
    priority = db.Column(db.Integer, default=1)  # 1-5 scale, 5 = highest
    status = db.Column(db.String(50), default='active')  # active, completed, paused
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'path_name': self.path_name,
            'skills_to_learn': self.skills_to_learn,
            'timeline_weeks': self.timeline_weeks,
            'priority': self.priority,
            'status': self.status
        }
