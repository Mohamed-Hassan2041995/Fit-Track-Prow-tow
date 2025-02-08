import { format, formatDistance } from 'date-fns';

export const formatDate = (date: Date | string): string => {
  return format(new Date(date), 'PP');
};

export const formatDateTime = (date: Date | string): string => {
  return format(new Date(date), 'PPp');
};

export const formatTimeAgo = (date: Date | string): string => {
  return formatDistance(new Date(date), new Date(), { addSuffix: true });
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat().format(num);
};