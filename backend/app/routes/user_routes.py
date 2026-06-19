from flask import Blueprint, request, jsonify
from app import db
from app.models import User, ProgressLog

bp = Blueprint('user', __name__, url_prefix='/api/users')

@bp.route('/', methods=['POST'])
def create_user():
    """Create a new user profile"""
    data = request.json
    
    try:
        user = User(
            email=data['email'],
            name=data['name'],
            current_level=data.get('current_level', 'beginner'),
            years_coding=data.get('years_coding', 0),
            current_skills=data.get('current_skills', {}),
            target_role=data.get('target_role', 'AI Engineer')
        )
        
        db.session.add(user)
        db.session.commit()
        
        return jsonify(user.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@bp.route('/<int:user_id>', methods=['GET'])
def get_user(user_id):
    """Get user profile"""
    user = User.query.get_or_404(user_id)
    return jsonify(user.to_dict())

@bp.route('/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    """Update user profile"""
    user = User.query.get_or_404(user_id)
    data = request.json
    
    if 'name' in data:
        user.name = data['name']
    if 'current_level' in data:
        user.current_level = data['current_level']
    if 'current_skills' in data:
        user.current_skills = data['current_skills']
    if 'target_role' in data:
        user.target_role = data['target_role']
    if 'years_coding' in data:
        user.years_coding = data['years_coding']
    
    db.session.commit()
    return jsonify(user.to_dict())

@bp.route('/<int:user_id>/progress', methods=['POST'])
def log_progress(user_id):
    """Log learning progress for a skill"""
    user = User.query.get_or_404(user_id)
    data = request.json
    
    try:
        progress = ProgressLog(
            user_id=user_id,
            skill=data['skill'],
            hours_spent=data.get('hours_spent', 0),
            proficiency_level=data.get('proficiency_level', 0),
            projects_completed=data.get('projects_completed', 0),
            resources_used=data.get('resources_used', [])
        )
        
        # Update user's current skills
        if user.current_skills is None:
            user.current_skills = {}
        user.current_skills[data['skill']] = data.get('proficiency_level', 0)
        
        db.session.add(progress)
        db.session.commit()
        
        return jsonify(progress.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@bp.route('/<int:user_id>/progress', methods=['GET'])
def get_progress(user_id):
    """Get all progress logs for user"""
    user = User.query.get_or_404(user_id)
    logs = ProgressLog.query.filter_by(user_id=user_id).all()
    return jsonify([log.to_dict() for log in logs])

@bp.route('/<int:user_id>/dashboard', methods=['GET'])
def get_dashboard(user_id):
    """Get user dashboard with summary stats"""
    user = User.query.get_or_404(user_id)
    logs = ProgressLog.query.filter_by(user_id=user_id).all()
    
    total_hours = sum(log.hours_spent for log in logs)
    total_projects = sum(log.projects_completed for log in logs)
    avg_proficiency = (sum(log.proficiency_level for log in logs) / len(logs)) if logs else 0
    
    return jsonify({
        'user': user.to_dict(),
        'stats': {
            'total_hours_learned': total_hours,
            'total_projects': total_projects,
            'average_proficiency': round(avg_proficiency, 1),
            'skills_learning': len(logs)
        }
    })
