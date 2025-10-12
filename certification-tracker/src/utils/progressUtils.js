export const computeStatusFromProgress = (percent) => {
  if (percent >= 100) return 'COMPLETED';
  if (percent > 0) return 'IN_PROGRESS';
  return 'PLANNED';
};