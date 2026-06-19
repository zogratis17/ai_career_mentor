import google.generativeai as genai
from dotenv import load_dotenv
import os
import json

load_dotenv()

class GeminiMentor:
    def __init__(self):
        self.api_key = os.getenv('GEMINI_API_KEY')
        genai.configure(api_key=self.api_key)
        self.model = genai.GenerativeModel('gemini-pro')
    
    def get_career_recommendation(self, user_profile):
        """
        AI mentor provides personalized career advice based on user profile
        """
        prompt = f"""You are an expert AI career mentor. Analyze this profile and provide specific, 
        actionable recommendations for transitioning to an AI career.

        User Profile:
        - Name: {user_profile['name']}
        - Current Level: {user_profile['current_level']}
        - Years of Coding: {user_profile['years_coding']}
        - Current Skills: {json.dumps(user_profile['current_skills'])}
        - Target Role: {user_profile['target_role']}
        
        Provide recommendations in this JSON format:
        {{
            "immediate_actions": ["action1", "action2"],
            "skill_gaps": ["gap1", "gap2"],
            "learning_priorities": ["priority1", "priority2"],
            "project_ideas": ["project1", "project2"],
            "timeline": "estimated timeline",
            "motivation": "personalized motivation message"
        }}
        
        Be specific and practical. Focus on AI/ML skills."""
        
        try:
            response = self.model.generate_content(prompt)
            # Parse JSON from response
            response_text = response.text
            # Extract JSON from markdown code blocks if present
            if "```json" in response_text:
                response_text = response_text.split("```json")[1].split("```")[0]
            elif "```" in response_text:
                response_text = response_text.split("```")[1].split("```")[0]
            
            return json.loads(response_text)
        except Exception as e:
            print(f"Error in Gemini API call: {e}")
            return self._fallback_recommendation(user_profile)
    
    def get_learning_suggestions(self, user_profile, recent_progress):
        """
        Based on progress, suggest next steps
        """
        prompt = f"""As an AI career mentor, based on this learner's recent progress, 
        suggest the next steps to improve their AI career readiness.

        Current Skills: {json.dumps(user_profile['current_skills'])}
        Recent Progress: {json.dumps(recent_progress)}
        
        Provide JSON response:
        {{
            "next_course": "specific course or resource",
            "practice_project": "detailed project idea",
            "estimated_time": "hours/weeks",
            "expected_outcome": "what they'll learn",
            "difficulty": "beginner/intermediate/advanced"
        }}
        
        Be very specific and practical."""
        
        try:
            response = self.model.generate_content(prompt)
            response_text = response.text
            if "```json" in response_text:
                response_text = response_text.split("```json")[1].split("```")[0]
            elif "```" in response_text:
                response_text = response_text.split("```")[1].split("```")[0]
            
            return json.loads(response_text)
        except Exception as e:
            print(f"Error in suggestion API call: {e}")
            return {}
    
    def get_interview_prep_tips(self, role, skills):
        """
        AI provides interview prep tips for the target role
        """
        prompt = f"""You are an AI interview coach. Provide focused interview preparation tips 
        for an AI engineer role with these skills: {json.dumps(skills)}.
        
        Provide JSON:
        {{
            "key_topics": ["topic1", "topic2"],
            "technical_questions": ["Q1", "Q2"],
            "behavioral_tips": ["tip1", "tip2"],
            "resources": ["resource1", "resource2"]
        }}"""
        
        try:
            response = self.model.generate_content(prompt)
            response_text = response.text
            if "```json" in response_text:
                response_text = response_text.split("```json")[1].split("```")[0]
            elif "```" in response_text:
                response_text = response_text.split("```")[1].split("```")[0]
            
            return json.loads(response_text)
        except Exception as e:
            return {"key_topics": ["Machine Learning", "Deep Learning", "Data Structures"]}
    
    def _fallback_recommendation(self, user_profile):
        """Fallback recommendations if API fails"""
        return {
            "immediate_actions": [
                "Learn Python fundamentals if not strong",
                "Start with linear algebra and calculus review",
                "Build your first ML project"
            ],
            "skill_gaps": ["Advanced Math", "Production ML", "Cloud ML platforms"],
            "learning_priorities": ["Python", "NumPy/Pandas", "Scikit-learn"],
            "project_ideas": ["Iris classification", "Housing price prediction"],
            "timeline": "6-12 months to AI-ready",
            "motivation": "You have a strong coding foundation. AI skills will make you highly valuable!"
        }
