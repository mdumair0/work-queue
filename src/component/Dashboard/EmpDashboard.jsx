import Header from "../Header";
import TaskListNumber from "../TaskList/TaskListNumber";
import TaskList from "../TaskList/TaskList";

const EmpDashboard = ({ logout, data, setData }) => {
  return (
    <div className="p-10 bg-[#1C1C1C] h-full md:h-screen text-white">
      <Header logout={logout} data={data} />
      {data && (
        <>
          <TaskListNumber data={data} />
          <TaskList data={data} setData={setData} />
        </>
      )}
      <div className="flex flex-col"></div>
    </div>
  );
};

export default EmpDashboard;
