import React, { useContext, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { AuthContext } from "../../context/AuthProvider";

const CreateTask = () => {
  const [userData, setUserData] = useContext(AuthContext);
  const url = import.meta.env.VITE_SERVERS_URL;

  const [title, settaskTitle] = useState("");
  const [description, settaskDescription] = useState("");
  const [taskDate, settaskDate] = useState("");
  const [userId, setassignTo] = useState("");
  const [category, setcategory] = useState("");

  const [Task, setTask] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();

    const missingFields = [];

    if (!title) missingFields.push("Name");
    if (!taskDate) missingFields.push("Date");
    if (!userId) missingFields.push("Assign To");
    if (!category) missingFields.push("Category");

    if (missingFields.length > 0) {
      alert(`Please enter the required fields: ${missingFields.join(", ")}`);
      return;
    }

    setTask({
      title,
      description,
      taskDate,
      userId,
      category,
    });

    const empData = userData.map((ele) => {
      if (ele._id == userId) {
        ele.tasks.push(Task);
        ele.tasks_count.new_task = ele.tasks_count.new_task + 1;
      }
      return ele;
    });

    if (Task) {
      const savedTask = saveTask(Task);
      console.log(savedTask)
      setUserData(empData);
      alert("Task added");
    }
  };

  async function saveTask(body) {
    console.log("TASK", body)
    const token = await localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Format the token as "Bearer <token>"
    };
    return await axios.post(`${url}/task`, body, { headers });
  }
  return (
    <div>
      <form
        onSubmit={(e) => submitHandler(e)}
        className="flex flex-wrap items-start justify-between bg-[#343434] px-5 md:px-10 py-5 rounded-md"
      >
        <div className="md:grid md:grid-cols-1 md:gap-2 content-around w-full md:w-1/2">
          <div>
            <h3 className="font-semibold pb-1">Task Title</h3>
            <input
              required
              value={title}
              onChange={(e) => settaskTitle(e.target.value)}
              className="w-full md:w-3/4 p-2 rounded bg-transparent border-[1px]"
              type="text"
              placeholder="make a UI design"
            />
          </div>
          <div>
            <h3 className="font-semibold pb-1">Date</h3>
            <input
              required
              value={taskDate}
              onChange={(e) => settaskDate(e.target.value)}
              className="w-full md:w-3/4 p-2 rounded bg-transparent border-[1px]"
              type="date"
            />
          </div>
          <div>
            <h3 className="font-semibold pb-1">Assign to</h3>
            <select
              required
              id="options"
              value={userId}
              onChange={(e) => setassignTo(e.target.value)}
              className="w-full md:w-3/4 p-2 rounded bg-transparent border-[1px]"
            >
              <option className="bg-transparent text-black " disabled value="">
                Please Select One
              </option>
              {userData?.map((ele) => {
                return (
                  <option
                    className="bg-transparent text-black "
                    key={ele._id}
                    value={ele._id}
                  >
                    {ele.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <h3 className="font-semibold pb-1">Category</h3>
            <input
              required
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
              value={description}
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
