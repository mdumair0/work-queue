import React, { useState } from "react";
import AcceptTask from "./AcceptTask";
import NewTask from "./NewTask";
import CompleteTask from "./CompleteTask";
import FailedTask from "./FailedTask";
import axios from "axios";
import toastTemplate from "../../utils/toastTemplate";

const TaskList = ({ data, setData }) => {
  const { successToast, failureToast, WaitingToast, notify } = toastTemplate;
  const [isLoading, setIsloading] = useState(null)
  const url = "http://localhost:3000";

  const updateTaskStatus = async (id, status, taskNumber) => {
    setIsloading(id)
    const waitId = WaitingToast("Saving Tasks Data");
    const response = await updateTask(status, taskNumber);
    if (response.status == 200) {
      successToast("Tasks Data Saved", waitId);
      setData((prevData) => ({
        ...prevData,
        tasks_count: taskNumber,
        tasks: prevData.tasks.map((task) =>
          task._id === id ? { ...task, ...status } : task
        ),
      }));
    } else {
        failureToast("Failed To Save Tasks Data", waitId)
    }
    setIsloading(null)
  };

  async function updateTask(data, taskNumber) {
    const token = await localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Format the token as "Bearer <token>"
    };
    delete taskNumber.color;

    console.log(data);
    const response = await axios.patch(
      `${url}/task/${data._id}`,
      { data, taskNumber },
      { headers }
    );
    return response;
  }

  const handleClick = {
    handleFailedClick: (data, taskNumber) => {
      updateTaskStatus(
        data._id,
        {
          ...data,
          new_task: false,
          failed: true,
          active: false,
          completed: false,
        },
        {
          new_task: data.new_task
            ? taskNumber.new_task - 1
            : taskNumber.new_task,
          failed: taskNumber.failed + 1,
          active: data.active ? taskNumber.active - 1 : taskNumber.active,
          completed: data.completed
            ? taskNumber.completed - 1
            : taskNumber.completed,
        }
      );
    },
    handleCompletedClick: (data, taskNumber) => {
      let mathadis = {
        new_task: data.new_task ? taskNumber.new_task - 1 : taskNumber.new_task,
        failed: data.failed ? taskNumber.failed - 1 : taskNumber.failed,
        active: data.active ? taskNumber.active - 1 : taskNumber.active,
        completed: taskNumber.completed + 1,
      };

      updateTaskStatus(
        data._id,
        {
          ...data,
          new_task: false,
          failed: false,
          active: false,
          completed: true,
        },
        mathadis
      );
    },
    handleActiveClick: (data, taskNumber) => {
      updateTaskStatus(
        data._id,
        {
          ...data,
          new_task: false,
          failed: false,
          active: true,
          completed: false,
        },
        {
          new_task: data.new_task
            ? taskNumber.new_task - 1
            : taskNumber.new_task,
          failed: data.failed ? taskNumber.failed - 1 : taskNumber.failed,
          active: taskNumber.active + 1,
          completed: data.completed
            ? taskNumber.completed - 1
            : taskNumber.completed,
        }
      );
    },
  };

  data.tasks_count.color = {
    new_task: "bg-yellow-400",
    active: "bg-blue-400",
    completed: "bg-green-400",
    failed: "bg-red-400",
  };

  return (
    <div
      id="taskList"
      className="flex items-center justify-start flex-nowrap overflow-x-auto gap-5 h-[60%] w-full py-5 my-10"
    >
      {data &&
        data.tasks.map((empData, it) => {
          if (empData.active) {
            return (
              <AcceptTask
                key={it}
                data={empData}
                handleClick={handleClick}
                updateTaskStatus={updateTaskStatus}
                taskNumber={data.tasks_count}
                isLoading={isLoading}
              />
            );
          } else if (empData.new_task) {
            return (
              <NewTask
                key={it}
                data={empData}
                handleClick={handleClick}
                updateTaskStatus={updateTaskStatus}
                taskNumber={data.tasks_count}
                isLoading={isLoading}
              />
            );
          } else if (empData.completed) {
            return (
              <CompleteTask
                key={it}
                data={empData}
                handleClick={handleClick}
                updateTaskStatus={updateTaskStatus}
                taskNumber={data.tasks_count}
                isLoading={isLoading}
              />
            );
          } else if (empData.failed) {
            return (
              <FailedTask
                key={it}
                data={empData}
                handleClick={handleClick}
                updateTaskStatus={updateTaskStatus}
                taskNumber={data.tasks_count}
                isLoading={isLoading}
              />
            );
          }
        })}
    </div>
  );
};

export default TaskList;
