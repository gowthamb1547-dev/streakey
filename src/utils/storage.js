/**
 * LocalStorage utility functions for persisting app data
 * Handles all CRUD operations for goals and streaks
 */

const STORAGE_KEY = 'learningStreakTracker';

/**
 * Get all data from LocalStorage
 * @returns {Object} The stored data object
 */
export const getStoredData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : { goals: [] };
  } catch (error) {
    console.error('Error reading from LocalStorage:', error);
    return { goals: [] };
  }
};

/**
 * Save data to LocalStorage
 * @param {Object} data - The data object to save
 */
export const saveStoredData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to LocalStorage:', error);
  }
};

/**
 * Get all goals from LocalStorage
 * @returns {Array} Array of goal objects
 */
export const getGoals = () => {
  const data = getStoredData();
  return data.goals || [];
};

/**
 * Save goals array to LocalStorage
 * @param {Array} goals - Array of goal objects
 */
export const saveGoals = (goals) => {
  const data = getStoredData();
  data.goals = goals;
  saveStoredData(data);
};

/**
 * Add a new goal
 * @param {Object} goal - Goal object to add
 * @returns {Array} Updated goals array
 */
export const addGoal = (goal) => {
  const goals = getGoals();
  const newGoal = {
    id: Date.now().toString(), // Simple ID generation
    name: goal.name,
    createdAt: new Date().toISOString(),
    currentStreak: 0,
    bestStreak: 0,
    checkIns: [], // Array of { date: 'YYYY-MM-DD', status: 'done' | 'missed' }
  };
  goals.push(newGoal);
  saveGoals(goals);
  return goals;
};

/**
 * Update a goal
 * @param {string} goalId - ID of the goal to update
 * @param {Object} updates - Object with fields to update
 * @returns {Array} Updated goals array
 */
export const updateGoal = (goalId, updates) => {
  const goals = getGoals();
  const index = goals.findIndex((g) => g.id === goalId);
  if (index !== -1) {
    goals[index] = { ...goals[index], ...updates };
    saveGoals(goals);
  }
  return goals;
};

/**
 * Delete a goal
 * @param {string} goalId - ID of the goal to delete
 * @returns {Array} Updated goals array
 */
export const deleteGoal = (goalId) => {
  const goals = getGoals();
  const filteredGoals = goals.filter((g) => g.id !== goalId);
  saveGoals(filteredGoals);
  return filteredGoals;
};

/**
 * Get today's date in YYYY-MM-DD format
 * @returns {string} Today's date
 */
export const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

/**
 * Get date string in YYYY-MM-DD format
 * @param {Date} date - Date object
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  return date.toISOString().split('T')[0];
};

/**
 * Get date N days ago
 * @param {number} daysAgo - Number of days ago
 * @returns {string} Formatted date string
 */
export const getDateDaysAgo = (daysAgo) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return formatDate(date);
};

