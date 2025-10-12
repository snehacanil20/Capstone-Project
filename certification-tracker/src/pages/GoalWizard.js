import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import { createGoal } from '../api/goalsApi';
import { useNavigate } from 'react-router-dom';
import '../styles/theme.css';

const GoalWizard = () => {
  const [certs, setCerts] = useState([]);
  const [form, setForm] = useState({
    certificationId: '',
    targetDate: '',
    notes: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/certifications').then(res => setCerts(res.data));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.certificationId || !form.targetDate) {
      alert('Please select a certification and target date.');
      return;
    }
    try {
      await createGoal({
        certificationId: Number(form.certificationId),
        targetDate: form.targetDate,
        notes: form.notes
      });
      navigate('/my-goals');
    } catch (err) {
      console.error(err);
      alert('Failed to create goal');
    }
  };

  return (
    <div className="page-content">
      <h2>Create a Certification Goal</h2>
      <form className="goal-form" onSubmit={submit}>
        <label>Certification</label>
        <select
          value={form.certificationId}
          onChange={e => setForm({ ...form, certificationId: e.target.value })}
          required
        >
          <option value="">-- Choose --</option>
          {certs.map(c => (
            <option key={c.id} value={c.id}>
              {c.name} ({c.authority})
            </option>
          ))}
        </select>

        <label>Target Date</label>
        <input type="date"
               value={form.targetDate}
               onChange={e => setForm({ ...form, targetDate: e.target.value })}
               required/>

        <label>Notes (optional)</label>
        <textarea
          rows={4}
          value={form.notes}
          onChange={e => setForm({ ...form, notes: e.target.value })}
          placeholder="Study plan, resources, mock tests..."
        />

        <div className="wizard-actions">
          <button type="submit">Create Goal</button>
          <button type="button" className="secondary-btn" onClick={() => navigate('/catalog')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default GoalWizard;