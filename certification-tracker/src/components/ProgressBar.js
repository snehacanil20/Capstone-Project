import React from 'react';

const ProgressBar = ({ value = 0 }) => {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className="progress-outer" aria-label={`Progress ${v}%`}>
      <div className="progress-inner" style={{ width: `${v}%` }}>{v}%</div>
    </div>
  );
};

export default ProgressBar;