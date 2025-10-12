import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';
import { uploadEvidenceFile, submitEvidence } from '../api/submissionsApi';
import '../styles/theme.css';
import { useNavigate } from 'react-router-dom';


const SubmitEvidence = () => {
  const [goals, setGoals] = useState([]);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    goalId: '',
    credentialId: '',
    authority: '',
    dateEarned: '',
    validThrough: '',
    file: null,
  });

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    axios.get('/goals/my').then((res) => {
      setGoals(res.data);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setForm({ ...form, file: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.file) {
      alert('Please select a file to upload.');
      return;
    }

    try {
      setUploading(true);
      const uploadRes = await uploadEvidenceFile(form.file);
      const filePath = uploadRes.data;

      const payload = {
        goalId: Number(form.goalId),
        credentialId: form.credentialId,
        authority: form.authority,
        dateEarned: form.dateEarned,
        validThrough: form.validThrough,
        filePath,
      };

      await submitEvidence(payload);
      alert('Evidence submitted successfully!');
      navigate('/my-submissions');
    } catch (err) {
      console.error(err);
      alert('Submission failed.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="page-content">
      <h2>Submit Certification Evidence</h2>
      <form className="goal-form" onSubmit={handleSubmit}>
        <label>Goal</label>
        <select
          name="goalId"
          value={form.goalId}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Goal --</option>
          {goals.map((g) => (
            <option key={g.id} value={g.id}>
              {g.certificationName} ({g.targetDate})
            </option>
          ))}
        </select>

        <label>Credential ID</label>
        <input
          type="text"
          name="credentialId"
          value={form.credentialId}
          onChange={handleChange}
          required
        />

        <label>Authority</label>
        <input
          type="text"
          name="authority"
          value={form.authority}
          onChange={handleChange}
          required
        />

        <label>Date Earned</label>
        <input
          type="date"
          name="dateEarned"
          value={form.dateEarned}
          onChange={handleChange}
          required
        />

        <label>Valid Through</label>
        <input
          type="date"
          name="validThrough"
          value={form.validThrough}
          onChange={handleChange}
          required
        />

        <label>Upload File (PDF/PNG)</label>
        <input
          type="file"
          name="file"
          accept=".pdf,.png"
          onChange={handleChange}
          required
        />

        <div className="wizard-actions">
          <button type="submit" disabled={uploading}>
            {uploading ? 'Uploading...' : 'Submit Evidence'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubmitEvidence;