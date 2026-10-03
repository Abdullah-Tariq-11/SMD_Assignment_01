import { RATE_PER_CREDIT } from '../constants';

export const parseScholarship = (text) => {
  if (text.trim() === '') return { value: 0, error: '' };
  const value = Number(text);
  if (Number.isNaN(value)) return { value: 0, error: 'Enter a number.' };
  if (value < 0 || value > 100) return { value: 0, error: 'Use a value from 0 to 100.' };
  return { value, error: '' };
};

export const estimateFees = (credits, scholarshipPercent, installments) => {
  const gross = credits * RATE_PER_CREDIT;
  const discount = (gross * scholarshipPercent) / 100;
  const net = gross - discount;
  return { gross, discount, net, perInstallment: net / installments };
};

export const formatPkr = (amount) =>
  'PKR ' + Math.round(amount).toLocaleString('en-US');
