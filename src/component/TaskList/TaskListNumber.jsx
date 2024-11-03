import React from 'react'

const TaskListNumber = ({data}) => {
    return (
        <div className='flex justify-between gap-5 screen my-10'>
            <div className="py-6 px-9 w-[45%] bg-red-400 rounded-xl">
                <h2 className='text-3xl font-semibold'>{data.tasks_count.new_task}</h2>
                <h3 className='text-xl font-medium'>New Tasks</h3>
            </div>
            <div className="py-6 px-9 w-[45%] bg-blue-400 rounded-xl">
                <h2 className='text-3xl font-semibold'>{data.tasks_count.completed}</h2>
                <h3 className='text-xl font-medium'>Completed</h3>
            </div>
            <div className="py-6 px-9 w-[45%] bg-green-400 rounded-xl">
                <h2 className='text-3xl font-semibold'>{data.tasks_count.active}</h2>
                <h3 className='text-xl font-medium'>Active</h3>
            </div>
            <div className="py-6 px-9 w-[45%] bg-yellow-400 rounded-xl">
                <h2 className='text-3xl font-semibold'>{data.tasks_count.failed}</h2>
                <h3 className='text-xl font-medium'>Failed</h3>
            </div>
        </div>
    )
}

export default TaskListNumber