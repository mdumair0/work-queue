import React from "react";

const FailedTask = ({ data }) => {
  return (
    <div
      className="flex-shrink-0 h-full p-5 w-[300px] bg-red-400 rounded-xl"
    >
      <div className="flex items-center justify-between">
        <h3 className="bg-red-600 text-xs px-2 py-1 rounded">
          {data.category}
        </h3>
        <h3 className="px-2 text-sm font-semibold rounded-lg">{data.date}</h3>
      </div>
      <h2 className="mt-5 text-2xl font-semibold">{data.title}</h2>
      <p>{data.description}</p>
      <div className="flex justify-between text-sm py-1">
        <button className="bg-green-600 p-2 rounded">Mark as Completed</button>
        <button className="bg-red-600 p-2 rounded">Mark as Failed</button>
      </div>
    </div>
  );
};
export default FailedTask;
