import React from "react";
import Header from "../Header";
import CreateTask from "../TaskList/CreateTask";
import AllTask from "../TaskList/AllTask";

const AdminDashboard = ({logout, data}) => {

  return (
    <div className="p-5 px-10 bg-[#1C1C1C] h-screen">
      <Header logout={logout}/>
      <CreateTask />
      <AllTask />
    </div>
  );
};

export default AdminDashboard;
