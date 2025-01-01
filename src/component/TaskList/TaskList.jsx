import { useState } from "react";
import AcceptTask from "./AcceptTask";
import NewTask from "./NewTask";
import CompleteTask from "./CompleteTask";
import FailedTask from "./FailedTask";
import axios from "axios";
import toastTemplate from "../../utils/toastTemplate";

const TaskList = ({ data, setData }) => {
  const { successToast, failureToast, WaitingToast } = toastTemplate;
  const [isLoading, setIsloading] = useState(null);
  const url = import.meta.env.VITE_SERVERS_URL;
  const updateTaskStatus = async (id, status, taskNumber) => {
    setIsloading(id);
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
      failureToast("Failed To Save Tasks Data", waitId);
    }
    setIsloading(null);
  };

  async function updateTask(data, taskNumber) {
    const token = await localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Format the token as "Bearer <token>"
    };
    delete taskNumber.color;

    const response = await axios.patch(
      `${url}/task/${data._id}`,
      { data, taskNumber },
      { headers }
    );
    return response;
  }

  const handleClick = {
    handleStatusChange: (task, taskNumber, newStatus) => {
      const oldStatus = Object.keys(taskComponents).find((key) => task[key]);

      const updatedTaskNumbers = {
        ...taskNumber,
        [oldStatus]: taskNumber[oldStatus] - 1,
        [newStatus]: taskNumber[newStatus] + 1,
      };

      const updatedTaskStatus = {
        new_task: newStatus === "new_task",
        active: newStatus === "active",
        completed: newStatus === "completed",
        failed: newStatus === "failed",
      };

      // Update the task status
      updateTaskStatus(
        task._id,
        { ...task, ...updatedTaskStatus },
        updatedTaskNumbers
      );
    },
  };

  data.tasks_count.color = {
    new_task: "bg-yellow-400",
    active: "bg-blue-400",
    completed: "bg-green-400",
    failed: "bg-red-400",
  };

  const taskComponents = {
    active: AcceptTask,
    new_task: NewTask,
    completed: CompleteTask,
    failed: FailedTask,
  };

  return (
    <div
      id="taskList"
      className="flex items-center justify-start flex-nowrap overflow-x-auto gap-5 h-[60%] w-full py-5 my-10"
    >
      {data &&
        data.tasks.map((task) => {
          const taskType = Object.keys(taskComponents).find((key) => task[key]);
          const TaskComponent = taskComponents[taskType];
          return (
            <TaskComponent
              key={task._id}
              data={task}
              handleClick={{
                ...handleClick,
                handleStatusChange: (newStatus) =>
                  handleClick.handleStatusChange(
                    task,
                    data.tasks_count,
                    newStatus
                  ),
              }}
              isLoading={isLoading}
            />
          );
        })}
    </div>
  );
};

export default TaskList;
