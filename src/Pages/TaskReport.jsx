import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const TaskReport = () => {
  const tasks = useSelector((state) => state.task.tasks);
  const [activeTab, setActiveTab] = useState('yesterday');

  const isYesterday = (dateStr) => {
    const date = new Date(dateStr);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return date.toDateString() === yesterday.toDateString();
  };

  const isThisWeek = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
    return date >= firstDayOfWeek && date <= lastDayOfWeek;
  };

  const isThisMonth = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  };

  const filterTasks = () => {
    switch (activeTab) {
      case 'yesterday':
        return tasks.filter((task) => isYesterday(task.date));
      case 'weekly':
        return tasks.filter((task) => isThisWeek(task.date));
      case 'monthly':
        return tasks.filter((task) => isThisMonth(task.date));
      default:
        return [];
    }
  };

  const filteredTasks = filterTasks();

  return (
    <div className="bg-text-color/5 p-4 flex flex-col gap-5 rounded-xl shadow-md">
      <h1 className="text-lg font-medium">Task Report</h1>

      {/* Tabs */}
      <div className="flex space-x-4">
        {['yesterday', 'weekly', 'monthly'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-light transition-all duration-200 ${
              activeTab === tab
                ? 'bg-bg-color1 text-text-color'
                : 'border border-bg-color1 text-bg-color1 hover:text-text-color hover:bg-bg-color1'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {filteredTasks.length === 0 ? (
        <p className="text-sm text-gray-500">No tasks found for this period.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="bg-text-color/5 rounded-xl flex items-start justify-between shadow-md p-5"
            >
              <div className="flex flex-col gap-2 items-start">
                <h2 className="text-base">{task.title}</h2>
                <p className="text-text-color/60 font-light text-sm">{task.description}</p>
                <span
                  className={`inline-block px-3 py-1 text-sm rounded-full ${
                    task.status === 'Completed'
                      ? 'bg-bg-color text-green-600'
                      : task.status === 'In Progress'
                      ? 'bg-bg-color text-yellow-600'
                      : 'bg-bg-color text-red-600'
                  }`}
                >
                  {task.status}
                </span>
                <p className="text-xs text-gray-400 mt-1">Date: {task.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskReport;
