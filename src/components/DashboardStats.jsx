import { Target, Flame, Trophy, CheckCircle2 } from 'lucide-react';
import { getTodayDate } from '../utils/storage';
import { getCheckInStatus } from '../utils/streakLogic';

/**
 * DashboardStats Component
 * Displays overall statistics cards
 */
const DashboardStats = ({ goals }) => {
  const today = getTodayDate();
  
  const totalGoals = goals.length;
  const activeStreaks = goals.filter((g) => g.currentStreak > 0).length;
  const bestStreak = goals.length > 0 
    ? Math.max(...goals.map((g) => g.bestStreak || 0))
    : 0;
  
  const todayCompleted = goals.filter((goal) => {
    const status = getCheckInStatus(goal.checkIns || [], today);
    return status === 'done';
  }).length;
  
  const todayProgress = totalGoals > 0 ? (todayCompleted / totalGoals) * 100 : 0;

  const stats = [
    {
      icon: Target,
      label: 'Total Goals',
      value: totalGoals,
      color: 'blue',
      bgGradient: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20',
      textColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      icon: Flame,
      label: 'Active Streaks',
      value: activeStreaks,
      color: 'orange',
      bgGradient: 'from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20',
      textColor: 'text-orange-600 dark:text-orange-400',
    },
    {
      icon: Trophy,
      label: 'Best Streak',
      value: bestStreak,
      color: 'yellow',
      bgGradient: 'from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20',
      textColor: 'text-yellow-600 dark:text-yellow-400',
    },
    {
      icon: CheckCircle2,
      label: "Today's Progress",
      value: `${todayCompleted}/${totalGoals}`,
      color: 'green',
      bgGradient: 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20',
      textColor: 'text-green-600 dark:text-green-400',
      progress: todayProgress,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className={`bg-gradient-to-br ${stat.bgGradient} rounded-xl p-6 shadow-lg`}
          >
            <div className="flex items-center justify-between mb-3">
              <Icon className={`${stat.textColor}`} size={24} />
            </div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
              {stat.label}
            </p>
            <p className={`text-3xl font-bold ${stat.textColor} mb-2`}>
              {stat.value}
            </p>
            {stat.progress !== undefined && (
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${stat.progress}%` }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;

