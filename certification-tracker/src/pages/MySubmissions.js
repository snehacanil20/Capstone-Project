import React, { useEffect, useState } from 'react';
import { getMySubmissions } from '../api/submissionsApi';
import '../styles/theme.css';

const MySubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMySubmissions();
        setSubmissions(res.data);
      } catch (err) {
        console.error(err);
        alert('Failed to load submissions');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="page-content">
      <h2>My Submissions</h2>
      {submissions.length === 0 ? (
        <p>No submissions yet.</p>
      ) : (
        <div className="goals-grid">
          {submissions.map((s) => (
            <div key={s.id} className="goal-card">
              <h3>Credential: {s.credentialId}</h3>
              <p><strong>Authority:</strong> {s.authority}</p>
              <p><strong>Date Earned:</strong> {s.dateEarned}</p>
              <p><strong>Valid Through:</strong> {s.validThrough}</p>
              <p><strong>File:</strong> <a href={`http://localhost:8080/api/files/${s.filePath}`} target="_blank" rel="noreferrer">View</a></p>
              <p><strong>Status:</strong> <span className={`status-chip status-${s.status.toLowerCase()}`}>{s.status}</span></p>
              <p><strong>Approver:</strong> {s.approverName || 'Not Assigned'}</p>
              {s.comments && <p><strong>Comments:</strong> {s.comments}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MySubmissions;