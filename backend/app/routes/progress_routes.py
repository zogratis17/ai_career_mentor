from flask import Blueprint, request, jsonify
from app.models import User, ProgressLog
from app import db

bp = Blueprint('progress', __name__, url_prefix='/api/progress')

@bp.route('/<int:user_id>/analytics', methods=['GET'])
def get_progress_analytics(user_id):
    """Get detailed progress analytics"""
    user = User.query.get_or_404(user_id)
    logs = ProgressLog.query.filter_by(user_id=user_id).all()
    
    # Aggregate by skill
    skill_stats = {}
    for log in logs:
        if log.skill not in skill_stats:
            skill_stats[log.skill] = {
                'skill': log.skill,
                'total_hours': 0,
                'total_projects': 0,
                'max_proficiency': 0,
                'entries': 0
            }
        
        skill_stats[log.skill]['total_hours'] += log.hours_spent
        skill_stats[log.skill]['total_projects'] += log.projects_completed
        skill_stats[log.skill]['max_proficiency'] = max(
            skill_stats[log.skill]['max_proficiency'],
            log.proficiency_level
        )
        skill_stats[log.skill]['entries'] += 1
    
    return jsonify({
        'user_id': user_id,
        'total_logs': len(logs),
        'skills_tracked': len(skill_stats),
        'skill_analytics': list(skill_stats.values())
    })

@bp.route('/<int:user_id>/milestones', methods=['GET'])
def get_milestones(user_id):
    """Calculate achievement milestones"""
    user = User.query.get_or_404(user_id)
    logs = ProgressLog.query.filter_by(user_id=user_id).all()
    
    total_hours = sum(log.hours_spent for log in logs)
    total_projects = sum(log.projects_completed for log in logs)
    
    milestones = []
    
    # 100-hour milestone
    if total_hours >= 100:
        milestones.append({
            'name': '100-Hour Learner',
            'description': 'Completed 100+ hours of learning',
            'achieved': True
        })
    
    # 5-project milestone
    if total_projects >= 5:
        milestones.append({
            'name': 'Project Builder',
            'description': 'Completed 5+ projects',
            'achieved': True
        })
    
    # Advanced proficiency
    advanced_skills = len([s for s in user.current_skills.values() if s >= 7]) if user.current_skills else 0
    if advanced_skills >= 2:
        milestones.append({
            'name': 'Specialist',
            'description': 'Reached proficiency 7+ in 2+ skills',
            'achieved': True
        })
    
    return jsonify({
        'user_id': user_id,
        'total_hours': total_hours,
        'total_projects': total_projects,
        'milestones': milestones
    })

@bp.route('/<int:user_id>/roadmap', methods=['GET'])
def get_learning_roadmap(user_id):
    """Get personalized learning roadmap"""
    user = User.query.get_or_404(user_id)
    logs = ProgressLog.query.filter_by(user_id=user_id).all()
    
    current_skills = user.current_skills or {}
    
    # Define AI career roadmap
    roadmap_phases = [
        {
            'phase': 1,
            'name': 'Python & Math Fundamentals',
            'skills': ['Python', 'Statistics', 'Linear Algebra'],
            'duration_weeks': 4
        },
        {
            'phase': 2,
            'name': 'ML Basics',
            'skills': ['ML', 'Scikit-learn', 'Data Analysis'],
            'duration_weeks': 6
        },
        {
            'phase': 3,
            'name': 'Deep Learning',
            'skills': ['DL', 'TensorFlow', 'PyTorch'],
            'duration_weeks': 8
        },
        {
            'phase': 4,
            'name': 'Specialization',
            'skills': ['NLP', 'CV', 'Reinforcement Learning'],
            'duration_weeks': 8
        }
    ]
    
    # Mark phases as completed based on skills
    for phase in roadmap_phases:
        phase['completed'] = all(
            skill in current_skills and current_skills[skill] >= 6
            for skill in phase['skills']
        )
    
    return jsonify({
        'user_id': user_id,
        'target_role': user.target_role,
        'roadmap': roadmap_phases
    })
