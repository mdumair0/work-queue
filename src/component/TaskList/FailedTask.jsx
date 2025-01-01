const FailedTask = ({ data, handleClick, taskNumber }) => {
  return (
    data && (
      <div
        className={`flex flex-col justify-between sefl-start flex-shrink-0 h-full p-5 w-[300px] bg-red-400 rounded-xl`}
      >
        <div className="flex items-center h-1/8 justify-between">
          <h3 className="bg-[#373737] text-xs px-2 py-1 rounded">
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
              onClick={() => handleClick.handleStatusChange("active", data, taskNumber)}
              className="bg-blue-600 p-2 rounded border-r-1 border-b-1 border-slate-800 drop-shadow-md hover:drop-shadow-sm"
            >
              Active
            </button>
          ) : (
            ""
          )}
          {data.new_task || data.active || data.failed ? (
            <button
              onClick={() => handleClick.handleStatusChange("completed", data, taskNumber)}
              className="bg-green-600 p-2 rounded border-r-1 border-b-1 border-slate-800 drop-shadow-md hover:drop-shadow-sm"
            >
              Completed
            </button>
          ) : (
            ""
          )}
          {data.new_task || data.active || data.completed ? (
            <button
              onClick={() => handleClick.handleStatusChange("failed", data, taskNumber)}
              className="bg-red-600 p-2 rounded border-r-1 border-b-1 border-slate-800 drop-shadow-md hover:drop-shadow-sm"
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
export default FailedTask;
