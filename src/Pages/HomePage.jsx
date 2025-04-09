import React, { useEffect, useState } from 'react';
import TodayTask from '../Component/TodayTask';
import PieChart from '../Component/PieChart';
import { getTodaytask } from '../api/task.api';
import PageLoader from '../Component/PageLoader'; // 👈 import your loader component

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true); // 👈 loader state

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await getTodaytask();
        const today = new Date().toISOString().split('T')[0];
        
        const todayTasks = data.data.filter(task => {
          const taskDate = new Date(task.dueDate).toISOString().split('T')[0];
          return taskDate === today;
        });

        setTasks(todayTasks);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading(false); // 👈 hide loader once done
      }
    };

    fetchTasks();
  }, []);

  const stats = [
    {
      title: "Today's Tasks",
      count: tasks.length,
    },
    {
      title: "Today's Pending Task",
      count: tasks.filter(task => task.status === 'Pending').length,
    },
    {
      title: "Today's In Progress Task",
      count: tasks.filter(task => task.status === 'Progress').length,
    },
    {
      title: "Today's Completed Task",
      count: tasks.filter(task => task.status === 'Completed').length,
    },
  ];

  return (
    <div className='relative'> {/* 👈 for loader positioning */}
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
              <PieChart tasks={tasks} />
            </div>
          </div>
        </div>
        <TodayTask />
      </div>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center  bg-opacity-70 z-50">
          <PageLoader />
        </div>
      )}
    </div>
  );
};

export default HomePage;
