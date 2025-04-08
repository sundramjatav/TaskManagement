import React from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import TodayTask from '../Component/TodayTask';
import PieChart from '../Component/PieChart';

const HomePage = () => {
  const tasks = useSelector((state) => state.task.tasks);
  const today = dayjs().format('YYYY-MM-DD');
  const todayTasks = tasks.filter(task => task.date === today);

  const stats = [
    {
      title: "Today's Tasks",
      count: todayTasks.length,
    },
    {
      title: "Today's Pending Task",
      count: todayTasks.filter(task => task.status === 'Pending').length,
    },
    {
      title: "Today's In Progress Task",
      count: todayTasks.filter(task => task.status === 'In Progress').length,
    },
    {
      title: "Today's Completed Task",
      count: todayTasks.filter(task => task.status === 'Completed').length,
    },
  ];

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex items-center flex-col lg:flex-row gap-5'>
        <div className='w-full lg:w-2/3 h-full p-4 grid gap-5 md:grid-cols-2 grid-cols-1 bg-text-color/5 rounded-md'>
          {stats.map((stat, index) => (
            <div key={index} className='w-full h-28 flex items-start gap-4 justify-center flex-col bg-text-color/5 rounded-md p-5'>
              <div className='flex items-center gap-4'>
                <div className='w-10 h-10 rounded-md bg-text-color/5 p-1'>
                  <img src="https://img.icons8.com/3d-fluency/94/group-task.png" className='w-full h-full object-cover' alt="" />
                </div>
                <h1 className='text-base'>{stat.title}</h1>
              </div>
              <p className='text-2xl'>{stat.count}</p>
            </div>
          ))}
        </div>
        <div className='w-full lg:w-1/3 h-full p-4 bg-text-color/5 rounded-md'>
          <h1 className='text-lg font-medium'>Today's Tasks by Status</h1>
          <div className='flex items-center justify-center w-full h-full'>
            <PieChart />
          </div>
        </div>
      </div>
      <TodayTask />
    </div>
  );
};

export default HomePage;
