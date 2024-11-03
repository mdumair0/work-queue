import React from 'react'
import Header from '../Header'
import TaskListNumber from '../TaskList/TaskListNumber'
import TaskList from '../TaskList/TaskList'

const EmpDashboard = ({logout, data}) => {

  return (
    <div className='p-10 bg-[#1C1C1C] h-screen'>
        <Header logout={logout} data={data}/>
        <TaskListNumber data={data}/>
        <TaskList data={data}/>
        <div className="flex flex-col">

        </div>
    </div>
  )
}

export default EmpDashboard