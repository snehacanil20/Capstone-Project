import React, { useEffect, useState } from 'react';
import GoalCard from '../components/GoalCard';   // <-- default import (NO braces)
import { getMyGoals, updateProgress, updateGoal } from '../api/goalsApi';
import '../styles/theme.css';

const MyGoals = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await getMyGoals();
      setGoals(Array.isArray(res.data) ? res.data : []); // guard
    } catch (e) {
      console.error(e);
      alert('Failed to load goals');
      setGoals([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const saveProgress = async (id, progress) => {
    try {
      await updateProgress(id, progress);
      await load();
    } catch (e) {
      console.error(e);
      alert('Failed to save progress');
    }
  };

  const saveDetails = async (id, { targetDate, notes }) => {
    try {
      await updateGoal(id, { targetDate, notes });
      await load();
    } catch (e) {
      console.error(e);
      alert('Failed to save goal details');
    }
  };

  if (loading) return <div className="page-content"><p>Loading...</p></div>;

  return (
    <div className="page-content">
      <h2>My Goals</h2>
      {goals.length === 0 ? (
        <p>No goals yet. Create one from <strong>New Goal</strong>.</p>
      ) : (
        <div className="goals-grid">
          {goals.map(g => (
            <GoalCard
              key={g.id}
              goal={g}
              onSaveProgress={saveProgress}
              onSaveDetails={saveDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyGoals;