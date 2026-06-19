from flask import Blueprint, request, jsonify
from app.models import User, JobRecommendation
from app.services.job_matcher import JobMatcher
from app import db

bp = Blueprint('jobs', __name__, url_prefix='/api/jobs')

matcher = JobMatcher()

@bp.route('/<int:user_id>/recommendations', methods=['GET'])
def get_job_recommendations(user_id):
    """Get job recommendations based on user skills"""
    user = User.query.get_or_404(user_id)
    
    top_n = request.args.get('top_n', 5, type=int)
    
    user_profile = {
        'current_skills': user.current_skills or {},
        'current_level': user.current_level,
        'target_role': user.target_role
    }
    
    recommendations = matcher.get_recommendations(user_profile, top_n)
    
    # Save recommendations to database
    for rec in recommendations:
        job_rec = JobRecommendation(
            user_id=user_id,
            job_title=rec['job']['title'],
            company=rec['job']['company'],
            platform=rec['job']['platform'],
            required_skills=rec['job']['required_skills'],
            match_score=rec['match_score'],
            salary_range=rec['job']['salary_range'],
            location=rec['job']['location'],
            experience_years=rec['job']['experience_years'],
            reason_recommended=rec['reason']
        )
        db.session.add(job_rec)
    
    db.session.commit()
    
    return jsonify({
        'user_id': user_id,
        'total_matches': len(recommendations),
        'recommendations': [
            {
                'job_title': rec['job']['title'],
                'company': rec['job']['company'],
                'platform': rec['job']['platform'],
                'match_score': rec['match_score'],
                'matched_skills': rec['matched_skills'],
                'missing_skills': rec['missing_skills'],
                'salary_range': rec['job']['salary_range'],
                'location': rec['job']['location'],
                'reason': rec['reason']
            }
            for rec in recommendations
        ]
    })

@bp.route('/skill-demand', methods=['GET'])
def get_skill_demand():
    """Get in-demand skills analysis"""
    demand = matcher.get_skill_demand_analysis()
    
    return jsonify({
        'in_demand_skills': [
            {
                'skill': skill,
                'demand_count': count
            }
            for skill, count in demand
        ]
    })

@bp.route('/<int:user_id>/recommendations/history', methods=['GET'])
def get_recommendation_history(user_id):
    """Get user's job recommendation history"""
    user = User.query.get_or_404(user_id)
    
    recs = JobRecommendation.query.filter_by(user_id=user_id).order_by(
        JobRecommendation.created_at.desc()
    ).all()
    
    return jsonify([rec.to_dict() for rec in recs])

@bp.route('/<int:user_id>/recommendations/<int:rec_id>/click', methods=['POST'])
def track_job_click(user_id, rec_id):
    """Track when user clicks on a job recommendation"""
    rec = JobRecommendation.query.filter_by(id=rec_id, user_id=user_id).get_or_404()
    
    rec.clicked = True
    db.session.commit()
    
    return jsonify({
        'status': 'tracked',
        'recommendation_id': rec_id
    })
