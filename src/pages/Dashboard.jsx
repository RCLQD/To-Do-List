import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AModal from './AModal';
import EModal from './EModal';

axios.defaults.baseURL = 'http://192.168.1.54:8000/api/todo';


function Dashboard() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isEModalOpen, setEModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [Datas, setDatas] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            axios.get('/')
            .then(res => {
                setDatas(res.data);
            })
            .catch(err => {
                console.error('Data not Found:', err);
            })
        }, 2000)
    }, [Datas]);

    const toggleModal = () => {
        setModalOpen (!isModalOpen);
    }

    const toggleEModal = (task = null) => {
        setSelectedTask(task);
        setEModalOpen(!isEModalOpen);
    };

    function DateNow(endDate) {
        const today = new Date();
        const end = new Date(endDate);
    
        today.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);
    
        const timeDiff = end.getTime() - today.getTime();
        
        const dayDiff = timeDiff / (1000 * 3600 * 24);
    
        return dayDiff === 1 ? "Tommorow" : dayDiff === 0 ? "Today" : endDate;
    }

    function Delete(task_uuid) {
        axios.delete(`/${task_uuid}`)
    }

    console.log(Datas)

    return(
        <main className="p-10 font-poppins" data-theme="light">

            <h1 className="text-3xl font-medium">To-Do List</h1>
            <hr className="my-7 border-y-[1px] border-slate-400" />

            <AModal openModal={isModalOpen} closeModal={toggleModal} />
            <EModal openEModal={isEModalOpen} closeEModal={toggleEModal} task={selectedTask} />

            <button onClick={toggleModal} className="px-5 py-3 border rounded-md inline-flex items-center gap-4 bg-blue-900 text-white opacity-85 hover:opacity-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
                    <g fill="none">
                        <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                        <path fill="currentColor" d="M10.5 20a1.5 1.5 0 0 0 3 0v-6.5H20a1.5 1.5 0 0 0 0-3h-6.5V4a1.5 1.5 0 0 0-3 0v6.5H4a1.5 1.5 0 0 0 0 3h6.5z" />
                    </g>
                </svg>
                <h1>New Task</h1>
            </button>

            { Datas.length === 0 && (
                <div role='status' className="w-full h-80 my-5 rounded-md flex justify-center items-center gap-x-3">
                    <div className="h-1/4 w-1/4 text-center">
                        <svg aria-hidden="true" role="status" className="inline w-14 h-14 text-blue-700 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )}

            { Datas.length !== 0 && (
                Datas.data.map((data) => (
                    <div className="group relative block" key={data.task_uuid}>
                        <span className="absolute inset-0 border-2 border-dashed border-slate-400 rounded-md"></span>
                        <div className="relative bg-white border border-slate-400 p-5 my-5 rounded-md flex justify-between gap-x-3 transition-transform group-hover:-translate-x-[5px] group-hover:-translate-y-[5px]">
                            <div className='space-y-2'>
                                <h1 className='text-blue-600 font-medium'>{data.task_name}</h1>
                                <div className='flex gap-x-2'>
                                    <div className='text-start'>
                                        <h1 className='text-xs'>Start Date</h1>
                                        <div className='text-sm inline-flex items-center justify-center gap-x-1 rounded-full px-2.5 py-0.5 border border-emerald-500 text-emerald-700'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                                                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 21H5a2 2 0 0 1-2-2v-9h18v5M15 4V2m0 2v2m0-2h-4.5M3 10V6a2 2 0 0 1 2-2h2m0-2v4m14 4V6a2 2 0 0 0-2-2h-.5M16 20l2 2l4-4" />
                                            </svg>
                                            <p>{data.start_date}</p>
                                        </div>
                                    </div>
                                    <div className='text-start'>
                                        <h1 className='text-xs'>End Date</h1>
                                        <div data-tooltip-target="endDate_tooltip" className='text-sm inline-flex items-center justify-center gap-x-1 rounded-full px-2.5 py-0.5 border border-red-500 text-red-700'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                                                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 21H5a2 2 0 0 1-2-2v-9h18v5M15 4V2m0 2v2m0-2h-4.5M3 10V6a2 2 0 0 1 2-2h2m0-2v4m14 4V6a2 2 0 0 0-2-2h-.5M18 22.243l2.121-2.122m0 0L22.243 18m-2.122 2.121L18 18m2.121 2.121l2.122 2.122" />
                                            </svg>
                                            <p>{DateNow(data.end_date)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center'>
                                <button onClick={() => toggleEModal(data)} className='py-2 px-4 text-yellow-500 duration-300 hover:bg-yellow-500 hover:text-white hover:rounded'>
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        width="25" 
                                        height="25" 
                                        viewBox="0 0 24 24"
                                    >
                                    <path 
                                        fill="currentColor" 
                                        d="M21 12a1 1 0 0 0-1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h6a1 1 0 0 0 0-2H5a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-6a1 1 0 0 0-1-1m-15 .76V17a1 1 0 0 0 1 1h4.24a1 1 0 0 0 .71-.29l6.92-6.93L21.71 8a1 1 0 0 0 0-1.42l-4.24-4.29a1 1 0 0 0-1.42 0l-2.82 2.83l-6.94 6.93a1 1 0 0 0-.29.71m10.76-8.35l2.83 2.83l-1.42 1.42l-2.83-2.83ZM8 13.17l5.93-5.93l2.83 2.83L10.83 16H8Z" 
                                    />
                                    </svg>
                                </button>
                                <button onClick={() => Delete(data.task_uuid)} className='py-2 px-4 duration-300 text-red-600 hover:bg-red-600 hover:text-white hover:rounded'>
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        width="25" 
                                        height="25" 
                                        viewBox="0 0 24 24"
                                        className=''
                                    >
                                    <path 
                                        fill="currentColor" 
                                        d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4zm2 2h6V4H9zM6.074 8l.857 12H17.07l.857-12zM10 10a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1" 
                                    />
                                    </svg>
                                </button>
                            </div>  
                        </div>
                    </div>
                ))
            )}

        </main>
    )
}

export default Dashboard