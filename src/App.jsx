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
  const [user, setUser] = useState(null);
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const [userData, setUserData] = useContext(AuthContext);
  const url = import.meta.env.VITE_SERVERS_URL;

  useEffect(() => {
    if (!localStorage.getItem("loggedInUser")) {
      const fetchData = async () => {
        const waitId = WaitingToast("Server is spinning up");
        const timeoutMs = 50000; // 40 seconds
        const intervalMs = 10000; // Log every 10 seconds

        // Create a function to handle the Axios request
        const axiosRequest = axios.get(`${url}/server`, { timeout: timeoutMs });

        // Create a progress logger
        let elapsed = 0;
        const interval = setInterval(() => {
          elapsed += intervalMs / 1000; // Convert to seconds
          if (elapsed == 10) {
            notify("We're getting things ready for you...", "😊");
          } else if (elapsed == 20) {
            notify("We’re almost there, just a few more seconds", "😁");
          } else if (elapsed == 30) {
            notify("Taking longer than usual", "😓");
          }
        }, intervalMs);

        try {
          const response = await axiosRequest; // Wait for Axios to complete
          if (response.status === 200) {
            successToast("Server is up!", waitId);
          }
          setTimeout(() => {
            notify("You are ready to go", "👍");
          }, 2500);
        } catch (error) {
          if (error.code === "ECONNABORTED") {
            failureToast("Server failed to load 😓", waitId);
          } else {
            failureToast("Server failed to load 😓", waitId);
            setTimeout(() => {
              notify("Please try again later", "😓");
            }, 3500);
            console.error("Request failed:", error.message);
          }
        } finally {
          clearInterval(interval); // Clear the interval when request completes
        }
      };
      fetchData();
    }
  }, []);

  const checkCredentials = ({ data }, role) => {
    localStorage.setItem(
      "loggedInUser",
      JSON.stringify({ name: data.user.name, userId: data.user._id, role })
    );
    localStorage.setItem("token", data.token);

    return true;
  };

  async function allTasks() {
    const { tasks, users } = await fetchData();

    let transformedData = users.reduce((acc, item) => {
      const { _id, ...rest } = item;
      acc[_id] = { ...item, tasks: [] };
      return acc;
    }, {});

    tasks?.forEach((ele) => {
      if (!!transformedData[ele.userId]) {
        transformedData[ele.userId].tasks.push(ele);
      }
    });

    transformedData = Object.values(transformedData);
    setUserData(transformedData);
  }

  async function empTasks(userData) {
    const tasks = await fetchTasks();
    const tasks_count = userData.tasks_count;
    setUserData({ tasks, tasks_count });
  }

  const handleLogin = async (email, password) => {
    const waitId = WaitingToast("Loggin In Please Wait");
    try {
      const userData = await axios.post(`${url}/user/login`, {
        email,
        password,
      });
      const role = userData.data.user.role;

      if (userData.status == 200 && checkCredentials(userData, role)) {
        successToast("User is Logged In", waitId);
        setUser(role);
        console.log(role);
      }

      if (role == "admin") {
        allTasks();
      } else {
        empTasks(userData.data.user);
      }
    } catch (error) {
      console.log(error.response.data.Error);
      if (error.code === "ECONNABORTED") {
        failureToast("Server failed to load 😓", waitId);
      } else {
        failureToast(
          `${error.response.data.Error || "Somethin went wrong"} 😓`,
          waitId
        );
        console.error("Request failed:", error.message);
      }
    }
  };

  const handleSignUp = async (name, email, password, role) => {
    const waitId = WaitingToast("Signing Up Please Wait");

    try {
      const userData = await axios.post(`${url}/user`, {
        name,
        email,
        password,
        role,
      });

      if (userData.status == 201 && checkCredentials(userData, role)) {
        successToast("User Created", waitId);
        setUser(role);
      }
    } catch (error) {
      console.log(error.response.data.message);
      if (error.code === "ECONNABORTED") {
        failureToast("Server failed to load 😓", waitId);
      } else {
        failureToast(
          `${error.response.data.message || "Somethin went wrong"} 😓`,
          waitId
        );
        console.error("Request failed:", error.message);
      }
    }
  };

  const logout = async () => {
    const waitId = WaitingToast("Logging Out");
    const token = await localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Format the token as "Bearer <token>"
    };
    const response = await axios.post(`${url}/user/logout`, {}, { headers });
    setUser(null);
    successToast("User is Logged Out", waitId);
  };

  return (
    <>
      <Toaster />
      {!user ? (
        <Login handleLogin={handleLogin} handleSignUp={handleSignUp} />
      ) : user === "emp" ? (
        <EmpDashboard logout={logout} data={userData} setData={setUserData} />
      ) : user === "admin" ? (
        <AdminDashboard
          logout={logout}
          data={loggedInUserData}
          setData={setLoggedInUserData}
        />
      ) : null}
    </>
  );
}

export default App;
