import { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { getLast7Days, getWeeklyStats } from '../utils/streakLogic';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

/**
 * WeeklyChart Component
 * Displays weekly progress chart for a specific goal
 */
const WeeklyChart = ({ goal }) => {
  const last7Days = useMemo(() => getLast7Days(goal), [goal]);
  const weeklyStats = useMemo(() => getWeeklyStats(goal), [goal]);

  // Format dates for display (e.g., "Mon 1")
  const formatDateLabel = (dateString) => {
    const date = new Date(dateString);
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return `${dayNames[date.getDay()]} ${date.getDate()}`;
  };

  // Bar chart data
  const barChartData = {
    labels: last7Days.map((day) => formatDateLabel(day.date)),
    datasets: [
      {
        label: 'Done',
        data: last7Days.map((day) => (day.status === 'done' ? 1 : 0)),
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
      },
      {
        label: 'Missed',
        data: last7Days.map((day) => (day.status === 'missed' ? 1 : 0)),
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Doughnut chart data
  const doughnutChartData = {
    labels: ['Completed', 'Missed', 'Not Checked'],
    datasets: [
      {
        data: [
          weeklyStats.completed,
          weeklyStats.missed,
          weeklyStats.total - weeklyStats.completed - weeklyStats.missed,
        ],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(148, 163, 184, 0.8)',
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(148, 163, 184, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  // Detect dark mode
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches ||
    document.documentElement.classList.contains('dark');

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: isDarkMode ? '#e2e8f0' : '#1e293b',
        },
      },
      title: {
        display: true,
        text: `Last 7 Days - ${goal.name}`,
        font: {
          size: 16,
          weight: 'bold',
        },
        color: isDarkMode ? '#e2e8f0' : '#1e293b',
      },
    },
    scales: {
      x: {
        ticks: {
          color: isDarkMode ? '#cbd5e1' : '#64748b',
        },
        grid: {
          color: isDarkMode ? 'rgba(148, 163, 184, 0.1)' : 'rgba(148, 163, 184, 0.2)',
        },
      },
      y: {
        beginAtZero: true,
        max: 1,
        ticks: {
          stepSize: 1,
          color: isDarkMode ? '#cbd5e1' : '#64748b',
        },
        grid: {
          color: isDarkMode ? 'rgba(148, 163, 184, 0.1)' : 'rgba(148, 163, 184, 0.2)',
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: isDarkMode ? '#e2e8f0' : '#1e293b',
        },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="h-64">
          <Bar data={barChartData} options={chartOptions} />
        </div>

        {/* Doughnut Chart */}
        <div className="h-64">
          <Doughnut data={doughnutChartData} options={doughnutOptions} />
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {weeklyStats.completed}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">Completed</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">
            {weeklyStats.missed}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">Missed</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-slate-600 dark:text-slate-400">
            {weeklyStats.total - weeklyStats.completed - weeklyStats.missed}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">Not Checked</p>
        </div>
      </div>
    </div>
  );
};

export default WeeklyChart;

