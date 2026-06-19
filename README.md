# AI Career Mentor

A custom, production-ready agentic mentoring platform for coders transitioning to AI careers.

## 🚀 Features

- **AI-Powered Mentoring**: Uses Gemini API to provide personalized career recommendations
- **Skill Gap Analysis**: Identifies missing skills for your target AI role
- **Job Matching Engine**: Matches your profile with AI jobs from Naukri & LinkedIn
- **Progress Tracking**: Monitor learning hours, projects, and proficiency levels
- **Learning Roadmap**: Structured AI career progression paths
- **Real-time Analytics**: Dashboard with detailed progress insights
- **Custom Interview Prep**: AI-generated tips for AI engineering interviews

## 📋 Project Structure

```
ai_career_mentor/
├── backend/                 # Flask API
│   ├── app/
│   │   ├── models/         # Database models (User, ProgressLog, LearningPath, JobRecommendation)
│   │   ├── routes/         # API endpoints (users, mentor, jobs, progress)
│   │   └── services/       # Business logic (Gemini mentor, job matching)
│   ├── requirements.txt     # Python dependencies
│   ├── run.py              # Flask app entry point
│   └── .env.example        # Environment variables template
│
├── frontend/               # React SPA
│   ├── src/
│   │   ├── components/     # Reusable UI components (Navigation, StatCard, SkillInput)
│   │   ├── pages/          # Page components (Dashboard, Mentor, Jobs, Analytics, etc.)
│   │   ├── services/       # API client services
│   │   ├── App.jsx        # Main app with routing
│   │   └── index.jsx      # React entry point
│   ├── public/
│   │   └── index.html     # HTML template
│   └── package.json        # Node dependencies
│
├── .gitignore             # Git ignore rules
└── README.md              # This file
```

## 🛠️ Tech Stack

- **Backend**: Flask, SQLAlchemy, Google Gemini API
- **Frontend**: React 18, React Router, Axios
- **Database**: SQLite (development), PostgreSQL (production)
- **Styling**: Custom CSS with responsive design
- **API Format**: REST with JSON

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- Git

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create `.env` file:
```env
FLASK_ENV=development
FLASK_PORT=5000
DATABASE_URL=sqlite:///mentor.db
SECRET_KEY=your-secret-key-change-in-production
GEMINI_API_KEY=your-gemini-api-key-here
```

5. Run Flask server:
```bash
python run.py
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm start
```

Frontend will run on `http://localhost:3000`

## 📊 API Endpoints

### User Management
- `POST /api/users/` - Create new user profile
- `GET /api/users/<id>` - Get user details
- `PUT /api/users/<id>` - Update user profile
- `POST /api/users/<id>/progress` - Log skill progress
- `GET /api/users/<id>/progress` - Get all progress logs
- `GET /api/users/<id>/dashboard` - Get dashboard data

### AI Mentor
- `GET /api/mentor/<id>/recommendations` - Get career recommendations
- `GET /api/mentor/<id>/learning-suggestions` - Get next learning steps
- `GET /api/mentor/<id>/interview-prep` - Get interview preparation tips
- `POST /api/mentor/<id>/create-learning-path` - Create personalized path
- `GET /api/mentor/<id>/learning-paths` - Get all learning paths

### Job Matching
- `GET /api/jobs/<id>/recommendations` - Get AI-matched jobs
- `GET /api/jobs/skill-demand` - Get in-demand skills analysis
- `GET /api/jobs/<id>/recommendations/history` - Get recommendation history
- `POST /api/jobs/<id>/recommendations/<rec_id>/click` - Track job clicks

### Analytics & Progress
- `GET /api/progress/<id>/analytics` - Get detailed skill analytics
- `GET /api/progress/<id>/milestones` - Get achievement milestones
- `GET /api/progress/<id>/roadmap` - Get learning roadmap

## 🤖 AI Integration (Gemini API)

The platform uses **Google Gemini API** for:
- Personalized career recommendations based on skills and goals
- Adaptive learning path suggestions
- Interview preparation tips
- Skill gap analysis

To configure:
1. Get API key from [Google AI Studio](https://aistudio.google.com)
2. Add to `.env` as `GEMINI_API_KEY=your-key`

## 💼 Job Platforms

Currently integrates with mock data matching Naukri & LinkedIn job formats:
- **Realistic job titles**: ML Engineer, AI Engineer, Data Scientist, NLP Engineer, etc.
- **Real salary ranges**: ₹4-35 LPA (based on role and experience)
- **Indian locations**: Bangalore, Pune, Hyderabad, Delhi, Remote
- **Experience levels**: 0-5 years

To integrate real APIs:
1. **Naukri**: Use Naukri API with authentication
2. **LinkedIn**: Use LinkedIn API with OAuth2 flow

## 📈 User Flows

### 1. Onboarding
- User creates profile with coding background
- Selects target role and current skill level
- AI analyzes profile and generates recommendations

### 2. Skill Tracking
- User logs learning sessions (hours, proficiency, projects)
- Track multiple skills simultaneously
- Dashboard aggregates progress data

### 3. Job Matching
- User views AI-matched jobs
- See match score, matched skills, skill gaps
- Click tracking for engagement analytics

### 4. Learning Guidance
- AI mentor suggests next steps
- Follow structured 4-phase learning roadmap
- Get interview preparation tips

### 5. Progress Monitoring
- View detailed analytics by skill
- Track milestones and achievements
- Get personalized insights

## 🎨 Frontend Features

- **Modern Design**: Purple/pink gradient theme with smooth animations
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Interactive Components**: Skill bars, progress charts, cards with hover effects
- **Real-time Updates**: Dashboard updates as progress is logged
- **Navigation**: Fixed sidebar with active route highlighting

## 📱 Pages

| Page | Purpose |
|------|---------|
| **Profile Setup** | User registration and onboarding |
| **Dashboard** | Overview of progress and quick actions |
| **AI Mentor** | Personalized recommendations and learning suggestions |
| **Job Recommendations** | AI-matched job opportunities |
| **Skill Tracker** | Track and visualize skill progress |
| **Learning Paths** | Structured AI career roadmap |
| **Analytics** | Detailed progress analytics and achievements |

## 🗄️ Database Models

### User
- Profile with skills, level, and target role
- Tracks years of coding experience
- Relationships to progress logs and learning paths

### ProgressLog
- Records learning entries per skill
- Tracks hours spent, proficiency level, projects completed
- Timestamps for activity history

### LearningPath
- Structured learning plans created by AI
- Contains skills to learn and timeline
- Priority levels and status tracking

### JobRecommendation
- Matched job opportunities
- Match score and reasoning
- Click tracking for analytics

## 🔒 Security

Current implementation is for development. For production:
- Implement JWT or OAuth authentication
- Add API rate limiting
- Use environment-based configuration
- Enable HTTPS
- Validate and sanitize all inputs
- Use PostgreSQL for better security

## 🚀 Deployment

### Backend
```bash
# Using Gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 run:app

# Deploy to: AWS, Heroku, Azure, DigitalOcean
```

### Frontend
```bash
# Build for production
npm run build

# Deploy to: Netlify, Vercel, AWS S3, GitHub Pages
```

## 📦 Git Workflow

All commits follow conventional commit format:
```
feat:     New feature
fix:      Bug fix
docs:     Documentation
chore:    Maintenance tasks
style:    Code style changes
refactor: Code refactoring
```

Current branch: `dev` (development)
Main branch: `main` (production)

## 🎯 Future Enhancements

- [ ] Live coding challenges and assessments
- [ ] Integration with Naukri & LinkedIn APIs
- [ ] Community forum and peer mentoring
- [ ] Advanced ML-based skill gap prediction
- [ ] Video course recommendations
- [ ] GitHub portfolio analysis
- [ ] Real-time chat with mentors
- [ ] Mobile app (React Native)
- [ ] Job application tracker
- [ ] Interview question bank

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is available
# Check .env file has GEMINI_API_KEY
# Verify virtual environment is activated
```

### Frontend won't load
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
npm start

# Check if backend is running on port 5000
```

### Database issues
```bash
# Reset database
rm backend/mentor.db
# Restart backend to recreate tables
```

## 📚 Learning Resources

- [Flask Documentation](https://flask.palletsprojects.com/)
- [React Documentation](https://react.dev/)
- [SQLAlchemy ORM](https://www.sqlalchemy.org/)
- [Google Gemini API](https://ai.google.dev/)

## 📄 License

MIT License - feel free to use for education and commercial purposes

## 👨‍💼 Contributing

1. Create feature branch: `git checkout -b feature/your-feature`
2. Commit with conventional commits: `git commit -m "feat: description"`
3. Push to branch: `git push origin feature/your-feature`
4. Create Pull Request

## 🆘 Support

For issues or questions:
1. Check existing GitHub issues
2. Create detailed issue with reproduction steps
3. Include environment details and error logs

---

**Built with ❤️ for AI career aspirants. Happy learning! 🚀**