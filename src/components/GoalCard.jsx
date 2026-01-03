import { Flame, Trophy, Calendar, CheckCircle2, XCircle, Trash2 } from 'lucide-react';
import { getTodayDate } from '../utils/storage';
import { updateCheckIn, getCheckInStatus } from '../utils/streakLogic';
import { getMotivationalMessage } from '../utils/motivationalMessages';

/**
 * GoalCard Component
 * Displays individual goal with streak info and check-in buttons
 */
const GoalCard = ({ goal, onUpdateGoal, onDeleteGoal }) => {
  const today = getTodayDate();
  const todayStatus = getCheckInStatus(goal.checkIns || [], today);
  const message = getMotivationalMessage(goal.currentStreak);

  const handleCheckIn = (status) => {
    const updatedGoal = updateCheckIn(goal, today, status);
    onUpdateGoal(goal.id, updatedGoal);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${goal.name}"?`)) {
      onDeleteGoal(goal.id);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1">
            {goal.name}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {message}
          </p>
        </div>
        <button
          onClick={handleDelete}
          className="text-slate-400 hover:text-red-500 transition-colors p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
          title="Delete goal"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <Flame className="text-orange-500" size={20} />
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Current Streak
            </span>
          </div>
          <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {goal.currentStreak}
          </p>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="text-yellow-500" size={20} />
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Best Streak
            </span>
          </div>
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {goal.bestStreak}
          </p>
        </div>
      </div>

      {/* Today's Check-in */}
      <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
        <div className="flex items-center gap-2 mb-3">
          <Calendar size={18} className="text-slate-500 dark:text-slate-400" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Today's Check-in
          </span>
        </div>

        {todayStatus ? (
          <div className="flex items-center gap-2">
            {todayStatus === 'done' ? (
              <>
                <CheckCircle2 className="text-green-500" size={20} />
                <span className="text-green-600 dark:text-green-400 font-medium">
                  Completed
                </span>
              </>
            ) : (
              <>
                <XCircle className="text-red-500" size={20} />
                <span className="text-red-600 dark:text-red-400 font-medium">
                  Missed
                </span>
              </>
            )}
            <button
              onClick={() => handleCheckIn(todayStatus === 'done' ? 'missed' : 'done')}
              className="ml-auto text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Change
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => handleCheckIn('done')}
              className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle2 size={18} />
              Done
            </button>
            <button
              onClick={() => handleCheckIn('missed')}
              className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <XCircle size={18} />
              Missed
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalCard;

