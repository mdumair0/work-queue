import { useContext, useEffect, useState } from "react";
import Login from "./component/Auth/Login";
import EmpDashboard from "./component/Dashboard/EmpDashboard";
import AdminDashboard from "./component/Dashboard/AdminDashboard";
import { AuthContext } from "./context/AuthProvider";
import { Toaster } from "react-hot-toast";
import toastTemplate from "./utils/toastTemplate";
import axios from "axios";
import { fetchData, fetchTasks } from "./tools";

function App() {
  const { successToast, failureToast, WaitingToast, notify } = toastTemplate;
  const [dataOfUser, setUser] = useState(null);

  const [userData, setUserData] = useContext(AuthContext);
  const url = import.meta.env.VITE_SERVERS_URL;
  // Helper to handle API requests with loading states and errors
  const handleApiRequest = async (
    requestFn,
    loadingMessage,
    successMessage
  ) => {
    const waitId = WaitingToast(loadingMessage);
    try {
      const response = await requestFn();
      if (successMessage) successToast(successMessage, waitId);
      return response;
    } catch (error) {
      failureToast(
        error.response?.data?.message || "Something went wrong 😓",
        waitId
      );
      console.error("Request failed:", error.message);
    }
  };

  useEffect(() => {
    const spinServer = async () => {
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
      const token = localStorage.getItem("token");
      const tokenTime = localStorage.getItem("tokenTime");

      if (Date.now() - tokenTime > 840000) {
        await handleApiRequest(
          () => axios.get(`${url}/server`),
          "Server is spinning up...",
          "Server is ready!"
        );
      }
      setUser(loggedInUser);

      // Ensure tasks are fetched based on user role
      if (loggedInUser && loggedInUser.role === "admin") {
        await fetchAllTasks(loggedInUser);
      } else if (loggedInUser && loggedInUser.role === "emp") {
        const headers = { Authorization: `Bearer ${token}` };
        const employee = await axios.get(`${url}/user/me`, { headers });
        const user = employee.data;

        await fetchEmpTasks(user);
      }
    };

    spinServer();
  }, []);

  const setLoggedInUser = (data, user) => {
    localStorage.setItem(
      "loggedInUser",
      JSON.stringify({
        name: data.user.name,
        userId: data.user._id,
        user,
        role: user.role,
      })
    );
    localStorage.setItem("token", data.token);
    localStorage.setItem("tokenTime", Date.now());
    setUser(user);
  };

  const fetchAllTasks = async (user) => {
    const { tasks, users } = await fetchData();
    const transformedData = users.reduce((acc, user) => {
      acc[user._id] = {
        ...user,
        tasks: tasks.filter((t) => t.userId === user._id),
      };
      return acc;
    }, {});
    setUserData({ data: Object.values(transformedData), name: user.name });
  };

  const fetchEmpTasks = async (user) => {
    const tasks = await fetchTasks();
    setUserData({ tasks, tasks_count: user.tasks_count, name: user.name });
  };

  const handleLogin = async (email, password) => {
    const loginFn = () => axios.post(`${url}/user/login`, { email, password });

    const response = await handleApiRequest(
      loginFn,
      "Logging in...",
      "Login successful!"
    );
    if (response?.data) {
      const { user, token } = response.data;
      setLoggedInUser(response.data, user);

      user.role === "admin" ? fetchAllTasks(user) : fetchEmpTasks(user);
    }
  };

  const handleSignUp = async (name, email, password, role) => {
    const signUpFn = () =>
      axios.post(`${url}/user`, { name, email, password, role });

    const response = await handleApiRequest(
      signUpFn,
      "Signing up...",
      "Account created!"
    );
    if (response?.data) {
      setLoggedInUser(response.data, role);
    }
  };

  const logout = async () => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    await handleApiRequest(
      () => axios.post(`${url}/user/logout`, {}, { headers }),
      "Logging out...",
      "Logout successful!"
    );
    setUserData(null);
    setUser(null);
  };

  return (
    <>
      <Toaster />
      {!dataOfUser?.role ? (
        <Login handleLogin={handleLogin} handleSignUp={handleSignUp} />
      ) : dataOfUser?.role === "emp" ? (
        <EmpDashboard logout={logout} data={userData} setData={setUserData} />
      ) : dataOfUser?.role === "admin" ? (
        <AdminDashboard logout={logout} data={userData} setData={setUserData} />
      ) : null}
    </>
  );
}

export default App;
