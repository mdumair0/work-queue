import React, { useState } from "react";
import AcceptTask from "./AcceptTask";
import NewTask from "./NewTask";
import CompleteTask from "./CompleteTask";
import FailedTask from "./FailedTask";

const TaskList = ({ data, setData }) => {

    const updateTaskStatus = (id, status, taskNumber) => {
        setData(prevData => ({
            ...prevData,
            tasks_count: taskNumber,
            tasks: prevData.tasks.map(task => 
                task.id === id ? { ...task, ...status } : task
            ),
        }));
    };

    data.tasks_count.color = {
        new_task: 'bg-yellow-400',
        active: 'bg-blue-400',
        completed: 'bg-green-400',
        failed: 'bg-red-400'
    }

    return (
        <div id="taskList" className="flex items-center justify-start flex-nowrap overflow-x-auto gap-5 h-[60%] w-full py-5 my-10">
            {data && data.tasks.map((empData, it) => {
                if (empData.active) {
                    return <AcceptTask key={it} data={empData} updateTaskStatus={updateTaskStatus} taskNumber={data.tasks_count} />
                } else if (empData.new_task) {
                    return <NewTask key={it} data={empData} updateTaskStatus={updateTaskStatus} taskNumber={data.tasks_count} />
                } else if (empData.completed) {
                    return <CompleteTask key={it} data={empData} updateTaskStatus={updateTaskStatus} taskNumber={data.tasks_count} />
                } else if (empData.failed) {
                    return <FailedTask key={it} data={empData} updateTaskStatus={updateTaskStatus} taskNumber={data.tasks_count} />
                }
            })}
        </div>
    );
};

export default TaskList;
