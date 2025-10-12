import React, { useEffect, useState } from 'react';
import {
    getPendingSubmissions,
    decideSubmission,
} from '../api/submissionsApi';
import '../styles/theme.css';

const ApproverDashboard = () => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [decision, setDecision] = useState({}); // { [id]: { approved: true/false, comments: '' } }

    const loadSubmissions = async () => {
        try {
            setLoading(true);
            const res = await getPendingSubmissions();
            setSubmissions(res.data);
        } catch (err) {
            console.error(err);
            alert('Failed to load submissions');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadSubmissions();
    }, []);

    const handleDecisionChange = (id, field, value) => {
        setDecision((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                [field]: value,
            },
        }));
    };

    const handleSubmitDecision = async (id) => {
        const d = decision[id];
        if (!d || d.approved === undefined || !d.comments) {
            alert('Please select approve/reject and enter comments.');
            return;
        }

        try {
            await decideSubmission(id, d);
            alert('Decision submitted.');
            await loadSubmissions();
        } catch (err) {
            console.error(err);
            alert('Failed to submit decision.');
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="page-content">
            <h2>Pending Submissions</h2>
            {submissions.length === 0 ? (
                <p>No pending submissions.</p>
            ) : (
                <div className="goals-grid">
                    {submissions.map((s) => (
                        <div key={s.id} className="goal-card">
                            <h3>Credential: {s.credentialId}</h3>
                            <p><strong>Authority:</strong> {s.authority}</p>
                            <p><strong>Date Earned:</strong> {s.dateEarned}</p>
                            <p><strong>Valid Through:</strong> {s.validThrough}</p>
                            <p><strong>File:</strong> <a href={`http://localhost:8080/api/files/${s.filePath}`} target="_blank" rel="noreferrer">View</a></p>
                            <p><strong>Approver:</strong> {s.approverName || 'Not Assigned'}</p>
                            <div className="goal-row">
                                <label><strong>Decision:</strong></label>
                                <select
                                    value={decision[s.id]?.approved ?? ''}
                                    onChange={(e) =>
                                        handleDecisionChange(s.id, 'approved', e.target.value === 'true')
                                    }
                                >
                                    <option value="">-- Select --</option>
                                    <option value="true">Approve</option>
                                    <option value="false">Reject</option>
                                </select>
                            </div>

                            <div className="goal-row">
                                <label><strong>Comments:</strong></label>
                                <textarea
                                    rows={3}
                                    value={decision[s.id]?.comments || ''}
                                    onChange={(e) =>
                                        handleDecisionChange(s.id, 'comments', e.target.value)
                                    }
                                />
                            </div>

                            <div className="goal-actions">
                                <button onClick={() => handleSubmitDecision(s.id)}>
                                    Submit Decision
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ApproverDashboard;