import React from "react";
import AcceptTask from "./AcceptTask";
import NewTask from "./NewTask";
import CompleteTask from "./CompleteTask";
import FailedTask from "./FailedTask";

const TaskList = ({ data }) => {

    return (
        <div id="taskList" className="flex items-center justify-start flex-nowrap overflow-x-auto gap-5 h-[60%] w-full py-5 my-10">
            {data && data.tasks.map((empData, it) => {
                if (empData.active) {
                    return <AcceptTask key={it} data={empData}/>
                } else if (empData.new_task) {
                    return <NewTask key={it} data={empData}/>
                } else if (empData.completed) {
                    return <CompleteTask key={it} data={empData}/>
                } else if (empData.failed) {
                    return <FailedTask key={it} data={empData}/>
                }
            })}
        </div>
    );
};

export default TaskList;
