import { useState, useEffect } from 'react';
import { Plus, Sparkles } from 'lucide-react';
import GoalForm from './components/GoalForm';
import GoalCard from './components/GoalCard';
import DashboardStats from './components/DashboardStats';
import WeeklyChart from './components/WeeklyChart';
import { getGoals, addGoal, updateGoal, deleteGoal } from './utils/storage';
import { getDashboardMessage } from './utils/motivationalMessages';

function App() {
  const [goals, setGoals] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedGoalForChart, setSelectedGoalForChart] = useState(null);

  // Load goals from LocalStorage on mount
  useEffect(() => {
    const loadedGoals = getGoals();
    setGoals(loadedGoals);
    
    // If there are goals, select the first one for chart by default
    if (loadedGoals.length > 0 && !selectedGoalForChart) {
      setSelectedGoalForChart(loadedGoals[0].id);
    }
  }, []);

  // Handle adding a new goal
  const handleAddGoal = (goalData) => {
    const updatedGoals = addGoal(goalData);
    setGoals(updatedGoals);
    
    // Auto-select the new goal for chart
    if (updatedGoals.length > 0) {
      setSelectedGoalForChart(updatedGoals[updatedGoals.length - 1].id);
    }
  };

  // Handle updating a goal
  const handleUpdateGoal = (goalId, updatedGoal) => {
    const updatedGoals = updateGoal(goalId, updatedGoal);
    setGoals(updatedGoals);
  };

  // Handle deleting a goal
  const handleDeleteGoal = (goalId) => {
    const updatedGoals = deleteGoal(goalId);
    setGoals(updatedGoals);
    
    // If deleted goal was selected for chart, select another one
    if (selectedGoalForChart === goalId) {
      setSelectedGoalForChart(updatedGoals.length > 0 ? updatedGoals[0].id : null);
    }
  };

  const dashboardMessage = getDashboardMessage(
    goals.filter((g) => g.currentStreak > 0).length,
    goals.length > 0 ? Math.max(...goals.map((g) => g.bestStreak || 0)) : 0
  );

  const selectedGoal = goals.find((g) => g.id === selectedGoalForChart);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="text-blue-600 dark:text-blue-400" size={40} />
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-100">
              Daily Learning Streak Tracker
            </h1>
            <Sparkles className="text-blue-600 dark:text-blue-400" size={40} />
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {dashboardMessage}
          </p>
        </div>

        {/* Dashboard Stats */}
        <DashboardStats goals={goals} />

        {/* Add Goal Button */}
        <div className="mb-8 flex justify-center">
          <button
            onClick={() => setIsFormOpen(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
          >
            <Plus size={24} />
            Create New Goal
          </button>
        </div>

        {/* Goals Grid */}
        {goals.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {goals.map((goal) => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  onUpdateGoal={handleUpdateGoal}
                  onDeleteGoal={handleDeleteGoal}
                />
              ))}
            </div>

            {/* Weekly Chart Section */}
            {goals.length > 0 && (
              <div className="mb-8">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Select Goal for Weekly Chart:
                  </label>
                  <select
                    value={selectedGoalForChart || ''}
                    onChange={(e) => setSelectedGoalForChart(e.target.value)}
                    className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    {goals.map((goal) => (
                      <option key={goal.id} value={goal.id}>
                        {goal.name}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedGoal && <WeeklyChart goal={selectedGoal} />}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
            <Sparkles className="mx-auto text-slate-400 mb-4" size={64} />
            <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-2">
              No Goals Yet
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mb-6">
              Create your first learning goal to start tracking your progress!
            </p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2 mx-auto"
            >
              <Plus size={20} />
              Create Your First Goal
            </button>
          </div>
        )}

        {/* Goal Form Modal */}
        <GoalForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onAddGoal={handleAddGoal}
        />
      </div>
    </div>
  );
}

export default App;
