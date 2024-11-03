import React from "react";

const CreateTask = () => {
  const submitHandler = (e) => {
    e.preventDefault()
  }
  return (
    <div>
      <form onSubmit={(e) => submitHandler(e)} className="flex flex-wrap items-start justify-between bg-[#343434] px-10 py-5 rounded-md">
        <div className="grid grid-cols-1 gap-2 content-around w-1/2">
          <div>
            <h3 className="font-semibold pb-1">Task Title</h3>
            <input
              className="w-3/4 p-2 rounded bg-transparent border-[1px]"
              type="text"
              placeholder="make a UI design"
            />
          </div>
          <div>
            <h3 className="font-semibold pb-1">Date</h3>
            <input
              className="w-3/4 p-2 rounded bg-transparent border-[1px]"
              type="date"
            />
          </div>
          <div>
            <h3 className="font-semibold pb-1">Assign to</h3>
            <input
              className="w-3/4 p-2 rounded bg-transparent border-[1px]"
              type="text"
              placeholder="Assignee Name"
            />
          </div>
          <div>
            <h3 className="font-semibold pb-1">Category</h3>
            <input
              className="w-3/4 p-2 rounded bg-transparent border-[1px]"
              type="text"
              placeholder="Design, Dev, etc"
            />
          </div>
        </div>
        <div className="w-1/2">
          <div className="flex flex-col">
            <h3 className="font-semibold">Description</h3>
            <textarea
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
