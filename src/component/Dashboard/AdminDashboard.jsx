import React from "react";
import Header from "../Header";
import CreateTask from "../TaskList/CreateTask";
import AllTask from "../TaskList/AllTask";

const AdminDashboard = ({logout, data, setData}) => {
  return (
    <div className="p-5 px-10 bg-[#1C1C1C] h-[1240px] md:h-screen">
      <Header logout={logout} data={data}/>
      <CreateTask />
      <AllTask />
    </div>
  );
};

export default AdminDashboard;
