import json
from collections import defaultdict

class JobMatcher:
    """
    Intelligent job recommendation engine
    Matches user skills with job requirements
    """
    
    def __init__(self):
        # Mock job database (Naukri & LinkedIn style)
        self.jobs_db = self._load_mock_jobs()
    
    def _load_mock_jobs(self):
        """Load realistic AI job market data"""
        return [
            {
                'id': 1,
                'title': 'Machine Learning Engineer',
                'company': 'TCS',
                'platform': 'naukri',
                'required_skills': ['Python', 'ML', 'Statistics', 'SQL'],
                'experience_years': 2,
                'salary_range': '₹8-15 LPA',
                'location': 'Bangalore',
                'description': 'Build ML models for production'
            },
            {
                'id': 2,
                'title': 'Deep Learning Specialist',
                'company': 'Wipro',
                'platform': 'naukri',
                'required_skills': ['Python', 'TensorFlow', 'DL', 'PyTorch'],
                'experience_years': 3,
                'salary_range': '₹12-18 LPA',
                'location': 'Pune',
                'description': 'Work on neural networks and CV'
            },
            {
                'id': 3,
                'title': 'AI Engineer',
                'company': 'Infosys',
                'platform': 'naukri',
                'required_skills': ['Python', 'ML', 'NLP', 'Cloud'],
                'experience_years': 2,
                'salary_range': '₹10-16 LPA',
                'location': 'Hyderabad',
                'description': 'Develop AI solutions for enterprise'
            },
            {
                'id': 4,
                'title': 'Data Scientist',
                'company': 'Amazon',
                'platform': 'linkedin',
                'required_skills': ['Python', 'Statistics', 'SQL', 'ML'],
                'experience_years': 3,
                'salary_range': '₹15-25 LPA',
                'location': 'Bangalore',
                'description': 'Build scalable data solutions'
            },
            {
                'id': 5,
                'title': 'AI/ML Engineer',
                'company': 'Microsoft',
                'platform': 'linkedin',
                'required_skills': ['Python', 'ML', 'Cloud', 'Azure'],
                'experience_years': 2,
                'salary_range': '₹18-28 LPA',
                'location': 'Delhi',
                'description': 'Develop AI products for global users'
            },
            {
                'id': 6,
                'title': 'NLP Engineer',
                'company': 'Google',
                'platform': 'linkedin',
                'required_skills': ['Python', 'NLP', 'DL', 'Transformers'],
                'experience_years': 3,
                'salary_range': '₹20-35 LPA',
                'location': 'Bangalore',
                'description': 'Build NLP models for search'
            },
            {
                'id': 7,
                'title': 'Junior ML Engineer',
                'company': 'Analytics Vidhya',
                'platform': 'naukri',
                'required_skills': ['Python', 'ML', 'Statistics'],
                'experience_years': 0,
                'salary_range': '₹4-8 LPA',
                'location': 'Remote',
                'description': 'Start your AI career with us'
            },
            {
                'id': 8,
                'title': 'ML Ops Engineer',
                'company': 'Databricks',
                'platform': 'linkedin',
                'required_skills': ['Python', 'ML', 'DevOps', 'Docker'],
                'experience_years': 2,
                'salary_range': '₹15-22 LPA',
                'location': 'Bangalore',
                'description': 'Deploy and manage ML models'
            }
        ]
    
    def get_recommendations(self, user_profile, top_n=5):
        """
        Get top job recommendations based on skill match
        Returns: List of jobs with match scores
        """
        user_skills = set(user_profile.get('current_skills', {}).keys())
        current_level = user_profile.get('current_level', 'beginner')
        
        scored_jobs = []
        
        for job in self.jobs_db:
            # Calculate skill match percentage
            required_skills = set(job['required_skills'])
            matched_skills = user_skills & required_skills
            skill_match = len(matched_skills) / len(required_skills) if required_skills else 0
            
            # Experience level adjustment
            exp_match = self._calc_experience_match(current_level, job['experience_years'])
            
            # Overall score (weighted)
            overall_score = (skill_match * 0.7 + exp_match * 0.3) * 100
            
            if overall_score > 0:  # Only include jobs with some match
                scored_jobs.append({
                    'job': job,
                    'match_score': round(overall_score, 1),
                    'matched_skills': list(matched_skills),
                    'missing_skills': list(required_skills - matched_skills),
                    'reason': self._generate_reason(skill_match, exp_match, job['title'])
                })
        
        # Sort by match score and return top N
        scored_jobs.sort(key=lambda x: x['match_score'], reverse=True)
        return scored_jobs[:top_n]
    
    def _calc_experience_match(self, user_level, required_exp):
        """Calculate experience level match"""
        level_to_exp = {
            'beginner': 0,
            'intermediate': 1.5,
            'advanced': 3
        }
        
        user_exp = level_to_exp.get(user_level, 0)
        # Perfect match if equal or slightly more experience
        if user_exp >= required_exp:
            return 1.0
        else:
            # Partial match if slightly less experienced
            return max(0.4, user_exp / (required_exp or 1))
    
    def _generate_reason(self, skill_match, exp_match, job_title):
        """Generate human-readable recommendation reason"""
        if skill_match > 0.7:
            return f"Strong skill match for {job_title}. You have most required skills."
        elif skill_match > 0.4:
            return f"Good foundation for {job_title}. Upskill in 2-3 areas."
        else:
            return f"Potential fit for {job_title}. Build required skills within 6 months."
    
    def get_job_by_id(self, job_id):
        """Get specific job details"""
        for job in self.jobs_db:
            if job['id'] == job_id:
                return job
        return None
    
    def get_jobs_by_platform(self, platform):
        """Get all jobs from specific platform"""
        return [j for j in self.jobs_db if j['platform'] == platform]
    
    def get_skill_demand_analysis(self):
        """Analyze what skills are most in-demand"""
        skill_count = defaultdict(int)
        for job in self.jobs_db:
            for skill in job['required_skills']:
                skill_count[skill] += 1
        
        sorted_skills = sorted(skill_count.items(), key=lambda x: x[1], reverse=True)
        return sorted_skills
