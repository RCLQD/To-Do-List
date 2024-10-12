import { useState, useEffect } from "react";
import axios from "axios";

function EModal({ openEModal, closeEModal, task }) {
    const [taskName, setTaskName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        if (task) {
            setTaskName(task.task_name);
            setStartDate(task.start_date);
            setEndDate(task.end_date);
        }
    }, [task]);

    const handleSave = (e) => {
        e.preventDefault();
        axios.put(`/${task.task_uuid}`, {
            task_name: taskName,
            start_date: startDate,
            end_date: endDate
        })
        .then(res => {
            console.log("Task updated:", res.data);
            closeEModal();
        })
        .catch(err => console.error('Error updating task:', err));
    }

    return (
        <>
            { openEModal && (
                <div className='relative z-20'>
                    <div className='fixed inset-0 backdrop-blur-sm'></div>
                    <div className='fixed inset-0 grid place-items-center'>
                        <div className='relative bg-white border border-slate-400 rounded-md p-2 w-[20rem] md:w-[30rem] lg:w-[40rem] shadow-md'>
                            <div className='absolute top-1 right-1'>
                                <button onClick={closeEModal} className='p-2 duration-200 hover:text-red-600'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
                                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="m7 7l10 10M7 17L17 7"/>
                                    </svg>
                                </button>
                            </div>
                            <div className='px-4 lg:px-6 my-2 md:my-4 lg:my-5'>
                                <h1 className='text-lg md:text-2xl text-center lg:text-start text-blue-800 font-medium'>Edit Task</h1>
                            </div>
                            <form onSubmit={handleSave}>
                                <div className='w-full grid grid-cols-1 md:grid-rows-2 gap-y-2 px-3 md:px-8 mb-2 md:mb-4'>
                                    <div className="w-full">
                                        <label htmlFor="task" className='text-sm md:text-lg block'>Task Name</label>
                                        <input 
                                            id="task" 
                                            type="text" 
                                            value={taskName}
                                            onChange={(e) => setTaskName(e.target.value)}
                                            className='w-full text-sm md:text-lg py-1 px-2 md:px-2 md:py-2 border border-black rounded-md' 
                                        />
                                    </div>
                                    <div className='w-full grid grid-cols-2 gap-x-4'>
                                        <div className='w-full'>
                                            <label htmlFor="startDate" className='text-sm md:text-lg block'>Start Date</label>
                                            <input 
                                                id="startDate" 
                                                type="date" 
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                                className='w-full text-sm md:text-lg p-1 md:p-2 border border-black rounded-md' 
                                            />
                                        </div>
                                        <div className='w-full'>
                                            <label htmlFor="endDate" className='text-sm md:text-lg block'>End Date</label>
                                            <input 
                                                id="endDate" 
                                                type="date" 
                                                value={endDate}
                                                onChange={(e) => setEndDate(e.target.value)}
                                                className='w-full text-sm md:text-lg p-1 md:p-2 border border-black rounded-md' 
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="px-3 md:px-8 py-4 md:py-5 text-center">
                                    <button type="submit" className="bg-blue-500 opacity-85 hover:opacity-100 text-white rounded-md w-full py-2 md:py-3">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default EModal;