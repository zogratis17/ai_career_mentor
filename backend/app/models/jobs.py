from app import db
from datetime import datetime

class JobRecommendation(db.Model):
    __tablename__ = 'job_recommendations'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    job_title = db.Column(db.String(200), nullable=False)
    company = db.Column(db.String(200), nullable=False)
    platform = db.Column(db.String(50), nullable=False)  # 'naukri' or 'linkedin'
    required_skills = db.Column(db.JSON, default=[])
    match_score = db.Column(db.Float, default=0.0)  # 0-100%
    salary_range = db.Column(db.String(100), nullable=True)
    location = db.Column(db.String(120), nullable=True)
    experience_years = db.Column(db.Integer, default=0)
    job_url = db.Column(db.String(500), nullable=True)
    reason_recommended = db.Column(db.Text)  # Why this job fits
    clicked = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'job_title': self.job_title,
            'company': self.company,
            'platform': self.platform,
            'required_skills': self.required_skills,
            'match_score': self.match_score,
            'salary_range': self.salary_range,
            'location': self.location,
            'experience_years': self.experience_years,
            'reason_recommended': self.reason_recommended,
            'created_at': self.created_at.isoformat()
        }
