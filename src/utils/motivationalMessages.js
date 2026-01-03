/**
 * Motivational messages based on streak count
 * Provides encouraging messages to keep users motivated
 */

/**
 * Get a motivational message based on streak count
 * @param {number} streak - Current streak count
 * @returns {string} Motivational message
 */
export const getMotivationalMessage = (streak) => {
  if (streak === 0) {
    return "Start your learning journey today! Every expert was once a beginner.";
  } else if (streak === 1) {
    return "Great start! You've taken the first step. Keep it going!";
  } else if (streak >= 2 && streak < 5) {
    return `Awesome! ${streak} days strong! You're building momentum.`;
  } else if (streak >= 5 && streak < 10) {
    return `Incredible! ${streak} days in a row! You're forming a habit.`;
  } else if (streak >= 10 && streak < 20) {
    return `Outstanding! ${streak} days! You're becoming unstoppable!`;
  } else if (streak >= 20 && streak < 30) {
    return `Phenomenal! ${streak} days! You're a learning machine!`;
  } else if (streak >= 30 && streak < 50) {
    return `Legendary! ${streak} days! You're in the elite tier!`;
  } else if (streak >= 50 && streak < 100) {
    return `Unbelievable! ${streak} days! You're a true champion!`;
  } else {
    return `🏆 LEGEND STATUS! ${streak} days! You're an inspiration to us all!`;
  }
};

/**
 * Get a motivational message for the overall dashboard
 * @param {number} totalActiveStreaks - Total number of active streaks
 * @param {number} bestStreak - Best streak across all goals
 * @returns {string} Dashboard motivational message
 */
export const getDashboardMessage = (totalActiveStreaks, bestStreak) => {
  if (totalActiveStreaks === 0) {
    return "Create your first learning goal to start tracking your progress!";
  } else if (totalActiveStreaks === 1) {
    return `You're tracking 1 goal. Focus is powerful!`;
  } else if (totalActiveStreaks < 5) {
    return `You're tracking ${totalActiveStreaks} goals. Great balance!`;
  } else {
    return `You're tracking ${totalActiveStreaks} goals. You're ambitious and dedicated!`;
  }
};

