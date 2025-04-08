import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Routers } from '../constants/Routes';

const TodayTask = () => {
    const tasks = useSelector((state) => state.task.tasks);
    const navigate = useNavigate();

    const isToday = (dateStr) => {
        const date = new Date(dateStr);
        const today = new Date();
        return date.toDateString() === today.toDateString();
    };

    const todayTasks = tasks.filter((task) => isToday(task.date)).reverse();
    const topFourTasks = todayTasks.slice(0, 4);

    return (
        <div className="bg-text-color/5 p-4 flex flex-col gap-5 rounded-xl shadow-md">
            <h1 className="text-lg font-medium">Today's Tasks</h1>

            {topFourTasks.length === 0 ? (
                <p className="text-sm text-gray-500">No tasks for today.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {topFourTasks.map((task) => (
                        <div
                            key={task.id}
                            className="bg-text-color/5 rounded-xl flex items-start justify-between shadow-md p-5"
                        >
                            <div className="flex flex-col gap-2 items-start">
                                <h2 className="text-base">{task.title}</h2>
                                <p className="text-text-color/60 font-light text-sm">
                                    {task.description}
                                </p>
                                <span
                                    className={`inline-block px-3 py-1 text-sm rounded-full ${task.status === 'Completed'
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

            {todayTasks.length > 4 && (
                <div>
                    <button
                        onClick={() => navigate(Routers.TASK)}
                        className="px-10 py-2 bg-bg-color1 text-white rounded hover:bg-bg-color1/90 text-sm"
                    >
                        View All
                    </button>
                </div>
            )}
        </div>
    );
};

export default TodayTask;
