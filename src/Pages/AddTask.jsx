import React, { useRef } from 'react';
import { FiCalendar } from 'react-icons/fi';

const AddTask = ({ onClose, onAdd, newTask, setNewTask }) => {
    const dateInputRef = useRef(null); // 👈 Create a ref

    return (
        <div className="fixed inset-0 backdrop-blur-[1px] w-full h-screen top-0 left-0 z-50 bg-text-color/10 flex justify-center items-center">
            <div className="bg-bg-color rounded-lg shadow-xl p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4 text-text-color">Add New Task</h2>

                <input
                    type="text"
                    placeholder="Title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="w-full border p-2 rounded focus:border-bg-color1 text-text-color outline-none bg-transparent text-sm mb-3"
                />

                <textarea
                    placeholder="Description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    className="w-full border p-2 rounded focus:border-bg-color1 text-text-color outline-none bg-transparent text-sm mb-3"
                ></textarea>

                <select
                    value={newTask.status}
                    onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                    className="w-full border p-2 rounded focus:border-bg-color1 text-text-color outline-none bg-transparent text-sm mb-4"
                >
                    <option className='text-bg-color' value="Pending">Pending</option>
                    <option className='text-bg-color' value="In Progress">In Progress</option>
                    <option className='text-bg-color' value="Completed">Completed</option>
                </select>

                {/* ✅ Date Field with Clickable Icon */}
                <div className="relative">
                    <input
                        ref={dateInputRef}
                        type="date"
                        value={newTask.dueDate}
                        onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                        className="w-full border p-2 rounded focus:border-bg-color1 text-text-color outline-none bg-transparent text-sm mb-4 appearance-none pr-10"
                    />
                    <button
                        type="button"
                        onClick={() => dateInputRef.current?.showPicker()} // 👈 programmatically open calendar
                        className="absolute right-3 top-2.5 text-text-color cursor-pointer"
                    >
                        <FiCalendar />
                    </button>
                </div>

                <div className="flex justify-end gap-3">
                    <button onClick={onClose} className="bg-text-color/10 text-text-color px-4 py-2 rounded">
                        Cancel
                    </button>
                    <button
                        onClick={onAdd}
                        className="bg-bg-color1/90 text-white px-4 py-2 rounded hover:bg-bg-color1"
                    >
                        Add Task
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddTask;
