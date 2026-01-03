/**
 * Streak calculation and management logic
 * Handles date-based streak tracking and validation
 */

import { getTodayDate, formatDate, getDateDaysAgo } from './storage';

/**
 * Check if a date is today
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {boolean}
 */
export const isToday = (dateString) => {
  return dateString === getTodayDate();
};

/**
 * Check if a date is yesterday
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {boolean}
 */
export const isYesterday = (dateString) => {
  const yesterday = getDateDaysAgo(1);
  return dateString === yesterday;
};

/**
 * Get check-in status for a specific date
 * @param {Array} checkIns - Array of check-in objects
 * @param {string} date - Date in YYYY-MM-DD format
 * @returns {string|null} 'done', 'missed', or null if no check-in
 */
export const getCheckInStatus = (checkIns, date) => {
  const checkIn = checkIns.find((ci) => ci.date === date);
  return checkIn ? checkIn.status : null;
};

/**
 * Calculate current streak for a goal
 * Streak = consecutive days marked as "done" going backwards from today
 * Streak breaks if: day is marked "missed" OR day has no check-in (gap)
 * @param {Array} checkIns - Array of check-in objects
 * @returns {number} Current streak count
 */
export const calculateCurrentStreak = (checkIns) => {
  if (!checkIns || checkIns.length === 0) return 0;

  const today = getTodayDate();
  let currentDate = new Date(today);
  let streak = 0;
  let startedCounting = false;

  // Check today first
  const todayCheckIn = checkIns.find((ci) => ci.date === today);
  if (todayCheckIn && todayCheckIn.status === 'done') {
    streak = 1;
    startedCounting = true;
    currentDate.setDate(currentDate.getDate() - 1);
  } else if (todayCheckIn && todayCheckIn.status === 'missed') {
    // Today is missed, streak is 0
    return 0;
  } else {
    // Today not checked in yet - check yesterday
    currentDate.setDate(currentDate.getDate() - 1);
  }

  // Count consecutive 'done' days going backwards
  // Stop on first gap (no check-in) or 'missed' status
  while (true) {
    const dateStr = formatDate(currentDate);
    const checkIn = checkIns.find((ci) => ci.date === dateStr);

    if (!checkIn) {
      // No check-in for this date = gap, streak is broken
      break;
    }

    if (checkIn.status === 'done') {
      streak++;
      startedCounting = true;
      currentDate.setDate(currentDate.getDate() - 1);
    } else if (checkIn.status === 'missed') {
      // Found a 'missed' day, streak is broken
      break;
    }

    // Safety limit: don't go back more than 365 days
    const daysAgo = Math.floor((new Date(today) - currentDate) / (1000 * 60 * 60 * 24));
    if (daysAgo > 365) break;
  }

  return streak;
};

/**
 * Update or add a check-in for a goal
 * @param {Object} goal - Goal object
 * @param {string} date - Date in YYYY-MM-DD format
 * @param {string} status - 'done' or 'missed'
 * @returns {Object} Updated goal object
 */
export const updateCheckIn = (goal, date, status) => {
  const checkIns = [...(goal.checkIns || [])];
  const existingIndex = checkIns.findIndex((ci) => ci.date === date);

  if (existingIndex !== -1) {
    // Update existing check-in
    checkIns[existingIndex].status = status;
  } else {
    // Add new check-in
    checkIns.push({ date, status });
  }

  // Calculate new streak
  const currentStreak = calculateCurrentStreak(checkIns);
  const bestStreak = Math.max(goal.bestStreak || 0, currentStreak);

  return {
    ...goal,
    checkIns,
    currentStreak,
    bestStreak,
  };
};

/**
 * Get last 7 days of check-ins for a goal
 * @param {Object} goal - Goal object
 * @returns {Array} Array of { date, status } for last 7 days
 */
export const getLast7Days = (goal) => {
  const checkIns = goal.checkIns || [];
  const last7Days = [];

  for (let i = 6; i >= 0; i--) {
    const date = getDateDaysAgo(i);
    const status = getCheckInStatus(checkIns, date);
    last7Days.push({ date, status });
  }

  return last7Days;
};

/**
 * Get weekly stats (completed vs missed) for last 7 days
 * @param {Object} goal - Goal object
 * @returns {Object} { completed: number, missed: number, total: number }
 */
export const getWeeklyStats = (goal) => {
  const last7Days = getLast7Days(goal);
  const completed = last7Days.filter((day) => day.status === 'done').length;
  const missed = last7Days.filter((day) => day.status === 'missed').length;
  const total = last7Days.length;

  return { completed, missed, total };
};

