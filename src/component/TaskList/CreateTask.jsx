import React, { useContext, useState } from "react";
import axios from "axios";
import toastTemplate from "../../utils/toastTemplate";
import { AuthContext } from "../../context/AuthProvider";

const CreateTask = () => {
  const url = import.meta.env.VITE_SERVERS_URL;
  const { successToast, failureToast, WaitingToast } = toastTemplate;
  const [userData, setUserData] = useContext(AuthContext);
  const [title, settaskTitle] = useState("");
  const [description, settaskDescription] = useState("");
  const [taskDate, settaskDate] = useState("");
  const [userId, setassignTo] = useState("");
  const [category, setcategory] = useState("");

  const submitHandler = async (e) => {
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
    const user = userData.data.find(user => user._id === userId);
    const waitId = WaitingToast(`Creating Task ${'For ' + user.name}`)
    
    const newTask = {
      title,
      description,
      taskDate,
      userId,
      category,
    };

    const updatedUserData = userData?.data?.map((ele) => {
      if (ele._id === userId) {
        return {
          ...ele,
          tasks: [...ele.tasks, newTask],
          tasks_count: {
            ...ele.tasks_count,
            new_task: ele.tasks_count.new_task + 1,
          },
        };
      }
      return ele;
    });
  
    try {
      const response = await saveTask(newTask);
  
      if (response.status === 201) {
        setUserData((prev) => ({
          ...prev,
          data: updatedUserData,
        }));
        successToast(`Task Created Successfully`, waitId)
      } else {
        failureToast(`Failed to Create Task. Something Went Wrong.`, waitId)
      }
    } catch (error) {
      console.error("Error saving task:", error);
      alert("An error occurred while saving the task.");
    }
  };
  

  async function saveTask(body) {
    const token = await localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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
              {userData?.data?.map((ele) => {
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
