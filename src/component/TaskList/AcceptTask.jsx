import React, { act, useState } from "react";

const AcceptTask = ({ data, taskNumber, updateTaskStatus }) => {
  const handleFailedClick = () => {
    updateTaskStatus(
      data.id,
      {
        ...data,
        new_task: false,
        failed: true,
        active: false,
        completed: false,
      },
      {
        new_task: (data.new_task ? taskNumber.new_task - 1 : taskNumber.new_task),
        failed: taskNumber.failed + 1,
        active: (data.active ? taskNumber.active - 1 : taskNumber.active),
        completed: (data.completed ? taskNumber.completed - 1 : taskNumber.completed)
      }
    );
  };

  const handleCompletedClick = () => {
    let mathadis = {
        new_task: (data.new_task ? taskNumber.new_task - 1 : taskNumber.new_task),
        failed: (data.failed ? taskNumber.failed - 1 : taskNumber.failed),
        active: (data.active ? taskNumber.active - 1 : taskNumber.active),
        completed: taskNumber.completed + 1,
    }
    console.log({mathadis})
    updateTaskStatus(
      data.id,
      {
        ...data,
        new_task: false,
        failed: false,
        active: false,
        completed: true,
      },
      mathadis
    );
  };

  const handleActiveClick = () => {
    updateTaskStatus(
      data.id,
      {
        ...data,
        new_task: false,
        failed: false,
        active: true,
        completed: false,
      },
      {
        new_task: (data.new_task ? taskNumber.new_task - 1 : taskNumber.new_task),
        failed: (data.failed ? taskNumber.failed - 1 : taskNumber.failed),
        active: taskNumber.active + 1,
        completed: (data.completed ? taskNumber.completed - 1 : taskNumber.completed),
      }
    );
  };

  return (
    data && (
      <div className={`flex flex-col justify-between sefl-start flex-shrink-0 h-full p-5 w-[300px] bg-blue-400 rounded-xl`}>
        <div className="flex items-center h-1/8 justify-between">
          <h3 className="bg-red-600 text-xs px-2 py-1 rounded">
            {data.category}
          </h3>
          <h3 className="px-2 text-sm font-semibold rounded-lg">{data.date}</h3>
        </div>

        <div className="flex flex-col h-6/8 justify-evenly">
            <h2 className="text-2xl font-semibold">{data.title}</h2>
            <p>{data.description}</p>
        </div>

        <div className="flex h-1/8 justify-items-end justify-between text-sm py-1">
          {data.new_task || data.failed || data.completed ? (
            <button
              onClick={() => handleActiveClick()}
              className="w-1/3  bg-blue-600 p-2 rounded"
            >
              Active
            </button>
          ) : (
            ""
          )}
          {data.new_task || data.active || data.failed? (
            <button
              onClick={() => handleCompletedClick()}
              className="w-1/3 bg-green-600 p-2 rounded"
            >
              Completed
            </button>
          ) : (
            ""
          )}
          {data.new_task || data.active || data.completed ? (
            <button
              onClick={() => handleFailedClick()}
              className="w-1/3 bg-red-600 p-2 rounded"
            >
              Failed
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    )
  );
};
export default AcceptTask;
