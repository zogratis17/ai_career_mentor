from flask import Blueprint, request, jsonify
from app.models import User, LearningPath
from app.services.gemini_mentor import GeminiMentor
from app import db

bp = Blueprint('mentor', __name__, url_prefix='/api/mentor')

mentor = GeminiMentor()

@bp.route('/<int:user_id>/recommendations', methods=['GET'])
def get_recommendations(user_id):
    """Get AI-powered career recommendations"""
    user = User.query.get_or_404(user_id)
    
    user_profile = {
        'name': user.name,
        'current_level': user.current_level,
        'years_coding': user.years_coding,
        'current_skills': user.current_skills or {},
        'target_role': user.target_role
    }
    
    recommendations = mentor.get_career_recommendation(user_profile)
    
    return jsonify({
        'user_id': user_id,
        'recommendations': recommendations
    })

@bp.route('/<int:user_id>/learning-suggestions', methods=['GET'])
def get_learning_suggestions(user_id):
    """Get next learning steps based on progress"""
    user = User.query.get_or_404(user_id)
    
    from app.models import ProgressLog
    recent_progress = ProgressLog.query.filter_by(user_id=user_id).order_by(
        ProgressLog.created_at.desc()
    ).limit(5).all()
    
    recent_progress_data = [
        {
            'skill': log.skill,
            'proficiency': log.proficiency_level,
            'hours': log.hours_spent
        }
        for log in recent_progress
    ]
    
    suggestions = mentor.get_learning_suggestions(
        user.to_dict(),
        recent_progress_data
    )
    
    return jsonify({
        'user_id': user_id,
        'suggestions': suggestions
    })

@bp.route('/<int:user_id>/interview-prep', methods=['GET'])
def get_interview_prep(user_id):
    """Get interview preparation tips"""
    user = User.query.get_or_404(user_id)
    
    tips = mentor.get_interview_prep_tips(
        user.target_role,
        user.current_skills or {}
    )
    
    return jsonify({
        'user_id': user_id,
        'role': user.target_role,
        'tips': tips
    })

@bp.route('/<int:user_id>/create-learning-path', methods=['POST'])
def create_learning_path(user_id):
    """Create a personalized learning path"""
    user = User.query.get_or_404(user_id)
    data = request.json
    
    try:
        path = LearningPath(
            user_id=user_id,
            path_name=data['path_name'],
            skills_to_learn=data.get('skills_to_learn', []),
            timeline_weeks=data.get('timeline_weeks', 12),
            priority=data.get('priority', 3)
        )
        
        db.session.add(path)
        db.session.commit()
        
        return jsonify(path.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@bp.route('/<int:user_id>/learning-paths', methods=['GET'])
def get_learning_paths(user_id):
    """Get all learning paths for user"""
    user = User.query.get_or_404(user_id)
    paths = LearningPath.query.filter_by(user_id=user_id).all()
    
    return jsonify([path.to_dict() for path in paths])
