import { computeStatusFromProgress } from './progressUtils';

test('computeStatusFromProgress', () => {
  expect(computeStatusFromProgress(0)).toBe('PLANNED');
  expect(computeStatusFromProgress(1)).toBe('IN_PROGRESS');
  expect(computeStatusFromProgress(99)).toBe('IN_PROGRESS');
  expect(computeStatusFromProgress(100)).toBe('COMPLETED');
});