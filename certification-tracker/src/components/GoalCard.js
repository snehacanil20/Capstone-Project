import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import { useNavigate } from 'react-router-dom';

const GoalCard = ({ goal, onSaveProgress, onSaveDetails }) => {
  const [progress, setProgress] = useState(goal.progressPercent);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    targetDate: goal.targetDate,
    notes: goal.notes || ''
  });

  const navigate = useNavigate();

  return (
    <div className="goal-card">
      <h3>{goal.certificationName}</h3>
      <p className="metric"><strong>Authority:</strong> {goal.certificationAuthority}</p>
      <p className="metric">
        <strong>Category:</strong> {goal.category} {goal.subcategory ? `› ${goal.subcategory}` : ''}
      </p>

      <div className="goal-row">
        <label><strong>Target Date:</strong></label>
        {editing ? (
          <input
            type="date"
            value={form.targetDate}
            onChange={e => setForm({ ...form, targetDate: e.target.value })}
          />
        ) : <span>{goal.targetDate}</span>}
      </div>

      <div className="goal-row">
        <label><strong>Notes:</strong></label>
        {editing ? (
          <textarea
            value={form.notes}
            onChange={e => setForm({ ...form, notes: e.target.value })}
            rows={3}
          />
        ) : <span>{goal.notes || '—'}</span>}
      </div>

      <div className="goal-row">
        <label><strong>Status:</strong></label>
        <span className={`status-chip status-${(goal.status || '').toLowerCase()}`}>{goal.status}</span>
      </div>

      <ProgressBar value={progress} />
      <input
        type="range"
        min={0}
        max={100}
        value={progress}
        onChange={(e) => setProgress(parseInt(e.target.value, 10))}
        className="progress-slider"
      />

      <div className="goal-actions">
        <button onClick={() => onSaveProgress(goal.id, progress)}>Save Progress</button>
        {!editing ? (
          <button className="secondary-btn" onClick={() => setEditing(true)}>Edit</button>
        ) : (
          <>
            <button className="secondary-btn" onClick={() => setEditing(false)}>Cancel</button>
            <button onClick={() => { onSaveDetails(goal.id, form); setEditing(false); }}>Save Details</button>
          </>
        )}
        {goal.status === 'COMPLETED' && (
          <button onClick={() => navigate(`/submit-evidence?goalId=${goal.id}`)}>
            Submit Evidence
          </button>
        )}
      </div>
    </div>
  );
};

export default GoalCard;