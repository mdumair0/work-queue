import { useContext, useEffect, useState } from "react";
import Login from "./component/Auth/Login";
import EmpDashboard from "./component/Dashboard/EmpDashboard";
import AdminDashboard from "./component/Dashboard/AdminDashboard";
import { getLocalStorage, setLocalStorage } from "./utils/localStorage";
import { AuthContext } from "./context/AuthProvider";

function App() {
  const [user, setUser] = useState(null);
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const AuthData = useContext(AuthContext);

  const checkCredentials = (checkData, dataArray, role) => {
    const user = dataArray.find(
      (data) =>
        data.email === checkData.email && data.password === checkData.password
    );

    localStorage.setItem("loggedInUser", JSON.stringify({ user, role }));
    if (role == "emp") {
      setLoggedInUserData(user);
    }

    return true && user;
  };

  // useEffect(() => {
  //   if (AuthData) {
  //     const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  //     if (loggedInUser) {
  //       setUser(loggedInUser.role);
  //       setLoggedInUserData(user);
  //     }
  //   }
  // }, [AuthData]);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (loggedInUser) {
      setUser(loggedInUser.role);
      setLoggedInUserData(loggedInUser.user);
    }
  }, [])
  

  const handleLogin = (email, password) => {
    if (
      AuthData &&
      checkCredentials({ email, password }, AuthData.adminData, "admin")
    ) {
      setUser("admin");
    } else if (
      AuthData &&
      checkCredentials({ email, password }, AuthData.empData, "emp")
    ) {
      setUser("emp");
    } else {
      alert("Invalid Credentials");
    }
  };

  const logout = () => {
    setUser(null);
  };
  console.log(loggedInUserData)
  return (
    <>
      {user ? "" : <Login handleLogin={handleLogin} />}
      {user == "emp" && loggedInUserData ? (
        <EmpDashboard logout={logout} data={loggedInUserData} setData={setLoggedInUserData}/>
      ) : (
        ""
      )}
      {user == "admin" ? (
        <AdminDashboard logout={logout} data={loggedInUserData} setData={setLoggedInUserData}/>
      ) : (
        ""
      )}
    </>
  );
}

export default App;
