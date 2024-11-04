import React, {useContext, useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from "../../context/AuthProvider";

const CreateTask = () => {

  const [userData, setUserData] = useContext(AuthContext)

  const [taskTitle, settaskTitle] = useState("")
  const [taskDescription, settaskDescription] = useState("")
  const [taskDate, settaskDate] = useState("")
  const [assignTo, setassignTo] = useState("")
  const [category, setcategory] = useState("")

  const [Task, setTask] = useState({})

  const submitHandler = (e) => {
    e.preventDefault()

    setTask({id: uuidv4(), taskTitle, taskDescription, taskDate, assignTo, category, active: false, new_task: true, failed:false, completed: false})

    const {empData, adminData} = userData

    empData.forEach((ele) => {
      if (ele.name == assignTo) {
        ele.tasks.push(Task)
        ele.tasks_count.new_task = ele.tasks_count.new_task + 1
      }
    })

    if (Task) {
      setUserData({empData, adminData})
      alert("Task added")
    }

    settaskTitle("")
    settaskDescription("")
    settaskDate("")
    setassignTo("")
    setcategory("")

  }
  return (
    <div>
      <form onSubmit={(e) => submitHandler(e)} className="flex flex-wrap items-start justify-between bg-[#343434] px-5 md:px-10 py-5 rounded-md">
        <div className="md:grid md:grid-cols-1 md:gap-2 content-around w-full md:w-1/2">
          <div>
            <h3 className="font-semibold pb-1">Task Title</h3>
            <input
              value={taskTitle}
              onChange={(e) => settaskTitle(e.target.value)}
              className="w-full md:w-3/4 p-2 rounded bg-transparent border-[1px]"
              type="text"
              placeholder="make a UI design"
            />
          </div>
          <div>
            <h3 className="font-semibold pb-1">Date</h3>
            <input
              value={taskDate}
              onChange={(e) => settaskDate(e.target.value)}
              className="w-full md:w-3/4 p-2 rounded bg-transparent border-[1px]"
              type="date"
            />
          </div>
          <div>
            <h3 className="font-semibold pb-1">Assign to</h3>
            <input
              value={assignTo}
              onChange={(e) => setassignTo(e.target.value)}
              className="w-full md:w-3/4 p-2 rounded bg-transparent border-[1px]"
              type="text"
              placeholder="Assignee Name"
            />
          </div>
          <div>
            <h3 className="font-semibold pb-1">Category</h3>
            <input
              value={category}
              onChange={(e) => setcategory(e.target.value)}
              className="w-full md:w-3/4 p-2 rounded bg-transparent border-[1px]"
              type="text"
              placeholder="Design, Dev, etc"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <div className="flex flex-col">
            <h3 className="font-semibold">Description</h3>
            <textarea
              value={taskDescription}
              onChange={(e) => settaskDescription(e.target.value)}
              className="bg-transparent border-[1px] rounded"
              name=""
              id=""
              cols="30"
              rows="9"
            ></textarea>
            <button className="bg-emerald-600 font-semibold text-lg py-2 mt-4 rounded-md border-r-1 border-b-1 border-slate-800 drop-shadow-md hover:drop-shadow-sm">
              Create Task
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
