import React, { useRef, useState } from 'react';
import { FiCalendar } from 'react-icons/fi';

const AddTask = ({ onClose, onAdd, newTask, setNewTask }) => {
    const dateInputRef = useRef(null);
    const [loading, setLoading] = useState(false); // 👈 New loading state

    const handleAddOrUpdate = async () => {
        setLoading(true);
        await onAdd(); // Assume onAdd is async or returns a promise
        setLoading(false);
    };

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

                <input
                    type="text"
                    placeholder="Category"
                    value={newTask.category}
                    onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                    className="w-full border p-2 rounded focus:border-bg-color1 text-text-color outline-none bg-transparent text-sm mb-3"
                />

                <textarea
                    placeholder="Description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    className="w-full border p-2 rounded focus:border-bg-color1 text-text-color outline-none bg-transparent text-sm mb-3"
                ></textarea>

                {newTask._id && (
                    <select
                        value={newTask.status}
                        onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                        className="w-full border p-2 rounded focus:border-bg-color1 text-text-color outline-none bg-transparent text-sm mb-3"
                    >
                        <option className="text-bg-color" value="Pending">Pending</option>
                        <option className="text-bg-color" value="Progress">Progress</option>
                        <option className="text-bg-color" value="Completed">Completed</option>
                    </select>
                )}

                <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                    className="w-full border p-2 rounded focus:border-bg-color1 text-text-color outline-none bg-transparent text-sm mb-3"
                >
                    <option className="text-bg-color" value="High">High</option>
                    <option className="text-bg-color" value="Medium">Medium</option>
                    <option className="text-bg-color" value="Low">Low</option>
                </select>

                <div className="relative">
                    <input
                        name="dueDate"
                        ref={dateInputRef}
                        type="date"
                        value={newTask.dueDate}
                        onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                        className="w-full border p-2 rounded focus:border-bg-color1 text-text-color outline-none bg-transparent text-sm mb-4 appearance-none pr-10"
                    />
                    <button
                        type="button"
                        onClick={() => dateInputRef.current?.showPicker()}
                        className="absolute right-3 top-2.5 text-text-color cursor-pointer"
                    >
                        <FiCalendar />
                    </button>
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="bg-text-color/10 text-text-color px-4 py-2 rounded"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleAddOrUpdate}
                        disabled={loading}
                        className={`px-4 py-2 rounded text-white ${
                            loading
                                ? 'bg-bg-color1/50 cursor-not-allowed'
                                : 'bg-bg-color1/90 hover:bg-bg-color1'
                        }`}
                    >
                        {loading
                            ? newTask._id
                                ? 'Updating...'
                                : 'Adding...'
                            : newTask._id
                            ? 'Update Task'
                            : 'Add Task'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddTask;
