import { format, formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

// Format currency
export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return '-';
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(amount);
};

// Format number with commas
export const formatNumber = (num) => {
  if (num === null || num === undefined) return '-';
  return new Intl.NumberFormat('ko-KR').format(num);
};

// Format date
export const formatDate = (date, formatStr = 'yyyy-MM-dd') => {
  if (!date) return '-';
  return format(new Date(date), formatStr, { locale: ko });
};

// Format datetime
export const formatDateTime = (date) => {
  if (!date) return '-';
  return format(new Date(date), 'yyyy-MM-dd HH:mm', { locale: ko });
};

// Format relative time
export const formatRelativeTime = (date) => {
  if (!date) return '-';
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ko });
};

// Format phone number
export const formatPhoneNumber = (phone) => {
  if (!phone) return '-';
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  }
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  }
  return phone;
};

// Format business number
export const formatBusinessNumber = (number) => {
  if (!number) return '-';
  const cleaned = number.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3');
  }
  return number;
};

// Truncate text
export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Format followers count
export const formatFollowers = (count) => {
  if (count === null || count === undefined) return '-';
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + 'M';
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'K';
  }
  return count.toString();
};

// Get SNS icon color
export const getSNSColor = (type) => {
  const colors = {
    instagram: '#E4405F',
    youtube: '#FF0000',
    tiktok: '#000000',
  };
  return colors[type] || '#666666';
};
