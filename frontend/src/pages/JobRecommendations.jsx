import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiBriefcase, FiTrendingUp, FiCheckCircle } from 'react-icons/fi';
import './JobRecommendations.css';

function JobRecommendations({ userId }) {
  const [jobs, setJobs] = useState([]);
  const [demand, setDemand] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    fetchJobData();
  }, [userId]);

  const fetchJobData = async () => {
    try {
      const [jobsRes, demandRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/jobs/${userId}/recommendations`),
        axios.get('http://localhost:5000/api/jobs/skill-demand')
      ]);
      
      setJobs(jobsRes.data.recommendations);
      setDemand(demandRes.data.in_demand_skills);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleJobClick = (job) => {
    setSelectedJob(job);
    // Track click
    axios.post(`http://localhost:5000/api/jobs/${userId}/recommendations/${job.id}/click`);
  };

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  return (
    <div className="jobs-page">
      <div className="jobs-header">
        <h1>💼 Job Opportunities</h1>
        <p>AI jobs matched to your skills and goals</p>
      </div>

      <div className="jobs-grid">
        <div className="jobs-list">
          <h2>Your Best Matches</h2>
          <div className="job-cards">
            {jobs.map((job, index) => (
              <div 
                key={index}
                className={`job-card ${selectedJob === job ? 'active' : ''}`}
                onClick={() => handleJobClick(job)}
              >
                <div className="job-header">
                  <h3>{job.job_title}</h3>
                  <span className="match-score">{job.match_score}%</span>
                </div>
                <p className="company">{job.company}</p>
                <p className="location">{job.location}</p>
                <p className="salary">{job.salary_range}</p>
                
                <div className="job-platform">
                  <span className={`platform platform-${job.platform}`}>
                    {job.platform === 'naukri' ? '🔗 Naukri' : '🔗 LinkedIn'}
                  </span>
                </div>

                <div className="match-details">
                  <div>
                    <span className="label">Matched:</span>
                    <div className="skills">
                      {job.matched_skills.map((skill, i) => (
                        <span key={i} className="skill-badge">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="jobs-sidebar">
          {selectedJob && (
            <div className="card job-details">
              <h2>{selectedJob.job_title}</h2>
              <p className="company-large">{selectedJob.company}</p>
              
              <div className="detail-item">
                <strong>Location:</strong>
                <p>{selectedJob.location}</p>
              </div>

              <div className="detail-item">
                <strong>Salary Range:</strong>
                <p>{selectedJob.salary_range}</p>
              </div>

              <div className="detail-item">
                <strong>Experience Required:</strong>
                <p>{selectedJob.experience_years} years</p>
              </div>

              <div className="detail-item">
                <strong>Why This Match:</strong>
                <p>{selectedJob.reason}</p>
              </div>

              <div className="detail-item">
                <strong>Your Skills Match:</strong>
                <div className="skills">
                  {selectedJob.matched_skills.map((skill, i) => (
                    <span key={i} className="skill-badge">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="detail-item">
                <strong>Skills to Learn:</strong>
                <div className="skills">
                  {selectedJob.missing_skills.map((skill, i) => (
                    <span key={i} className="skill-badge missing">{skill}</span>
                  ))}
                </div>
              </div>

              <button className="btn btn-primary" onClick={() => window.open('#', '_blank')}>
                <FiBriefcase /> View on {selectedJob.platform === 'naukri' ? 'Naukri' : 'LinkedIn'}
              </button>
            </div>
          )}

          <div className="card">
            <h3>📊 In-Demand Skills</h3>
            <div className="demand-list">
              {demand.slice(0, 5).map((item, index) => (
                <div key={index} className="demand-item">
                  <span className="demand-rank">#{index + 1}</span>
                  <div className="demand-info">
                    <strong>{item.skill}</strong>
                    <p className="text-secondary">{item.demand_count} jobs</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobRecommendations;
