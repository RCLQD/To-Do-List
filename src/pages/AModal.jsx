import React, { useState } from 'react';
import axios from 'axios';

function AModal({ openModal, closeModal }) {
    // State to manage the task data
    const [task, setTask] = useState({
        task_name: '',
        start_date: '',
        end_date: ''
    });

    // Function to handle changes in the input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask((prevTask) => ({
            ...prevTask,
            [name]: value
        }));
    };

    // Function to add a new task
    const addTask = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            const response = await axios.post('/', task); // Adjust the URL as needed
            console.log('Task created:', response.data);
            // Clear the task input fields after submission
            setTask({ task_name: '', start_date: '', end_date: '' });
            closeModal(); // Close the modal after submission
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    return (
        <>
            {openModal && (
                <div className='relative z-20'>
                    <div className='fixed inset-0 backdrop-blur-sm'></div>
                    <div className='fixed inset-0 grid place-items-center'>
                        <div className='relative bg-white border border-slate-400 rounded-md p-2 w-[20rem] md:w-[30rem] lg:w-[40rem] shadow-md'>
                            <div className='absolute top-1 right-1'>
                                <button onClick={closeModal} className='p-2 duration-200 hover:text-red-600'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
                                        <path
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2.5"
                                            d="m7 7l10 10M7 17L17 7"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div className='px-4 lg:px-6 my-2 md:my-4 lg:my-5'>
                                <h1 className='text-lg md:text-2xl text-center lg:text-start text-blue-800 font-medium'>Add New Task</h1>
                            </div>
                            <form onSubmit={addTask}> {/* Attach addTask to the form submission */}
                                <div className='w-full grid grid-cols-1 md:grid-rows-2 gap-y-2 px-3 md:px-8 mb-2 md:mb-4'>
                                    <div className="w-full">
                                        <label htmlFor="task_name" className='text-sm md:text-lg block'>Task Name</label>
                                        <input
                                            id="task_name"
                                            name="task_name" // Add name attribute for state management
                                            type="text"
                                            value={task.task_name} // Bind value to state
                                            onChange={handleChange} // Update state on change
                                            className='w-full text-sm md:text-lg py-1 px-2 md:px-2 md:py-2 border border-black rounded-md'
                                        />
                                    </div>
                                    <div className='w-full grid grid-cols-2 gap-x-4'>
                                        <div className='w-full'>
                                            <label htmlFor="start_date" className='text-sm md:text-lg block'>Start Date</label>
                                            <input
                                                id="start_date"
                                                name="start_date" // Add name attribute for state management
                                                type="date"
                                                value={task.start_date} // Bind value to state
                                                onChange={handleChange} // Update state on change
                                                className='w-full text-sm md:text-lg p-1 md:p-2 border border-black rounded-md'
                                            />
                                        </div>
                                        <div className='w-full'>
                                            <label htmlFor="end_date" className='text-sm md:text-lg block'>End Date</label>
                                            <input
                                                id="end_date"
                                                name="end_date" // Add name attribute for state management
                                                type="date"
                                                value={task.end_date} // Bind value to state
                                                onChange={handleChange} // Update state on change
                                                className='w-full text-sm md:text-lg p-1 md:p-2 border border-black rounded-md'
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="px-3 md:px-8 py-4 md:py-5 text-center">
                                    <button
                                        type="submit" // Ensure this is a submit button
                                        className="bg-blue-500 opacity-85 hover:opacity-100 text-white rounded-md w-full py-2 md:py-3"
                                    >
                                        Create
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default AModal;