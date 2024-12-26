import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthProvider";

const AllTask = ({ data }) => {
  const [userData, setUserData] = useContext(AuthContext);

  return (
    <div
      id="taskList"
      className="flex flex-col bg-[#343434] h-96 md:h-52 p-5 mt-2 rounded "
    >
      <div className="flex bg-red-400 py-2 px-1 md:px-4 mb-1 text-xs md:text-base text-center md:text-left justify-between rounded">
        <h2 className="w-1/5 bg-red-400">Employee Name</h2>
        <h3 className="w-1/5 bg-red-400">New Tasks</h3>
        <h5 className="w-1/5 bg-red-400">Active Tasks</h5>
        <h5 className="w-1/5 bg-red-400">Complete</h5>
        <h5 className="w-1/5 bg-red-400">Failed Tasks</h5>
      </div>
      <div id="taskList" className="overflow-auto">
        {userData?.data?.map((ele) => {
          if (ele && !!ele._id) {
            return (
              <div
                key={ele._id}
                className="flex border border-red-400 py-2 px-2 md:px-4 my-1 text-end md:text-start justify-between rounded font-medium"
              >
                <h2 className="text-start text-sm md:text-base w-1/5 ">
                  {ele.name}
                </h2>
                <h3 className="w-1/5 text-yellow-300">
                  {ele.tasks_count.new_task}
                </h3>
                <h5 className="w-1/5 text-blue-400">
                  {ele.tasks_count.active}
                </h5>
                <h5 className="w-1/5 text-green-400">
                  {ele.tasks_count.completed}
                </h5>
                <h5 className="w-1/5 text-red-400">{ele.tasks_count.failed}</h5>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default AllTask;
