import type { Customer } from '@/types/auth';

/**
 * Helper to get the display name from a customer object
 * Checks username, name, displayName, and email in that order
 */
export const getDisplayName = (user: Customer | null): string => {
  if (!user) return '';
  return user.fullName || user.username || user.email.split('@')[0];
};

/**
 * Helper to get the initial letter for avatar
 */
export const getInitial = (user: Customer | null): string => {
  const name = getDisplayName(user);
  return name.charAt(0).toUpperCase() || 'U';
};
