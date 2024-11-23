import { useContext, useEffect, useState } from "react";
import Login from "./component/Auth/Login";
import EmpDashboard from "./component/Dashboard/EmpDashboard";
import AdminDashboard from "./component/Dashboard/AdminDashboard";
import { getLocalStorage, setLocalStorage } from "./utils/localStorage";
import { AuthContext } from "./context/AuthProvider";
import { Toaster } from "react-hot-toast";
import toastTemplate from "./utils/toastTemplate";
import axios from "axios";

function App() {
  const { successToast, failureToast, WaitingToast, notify } = toastTemplate;
  const [user, setUser] = useState(null);
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const [userData, setUserData] = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const waitId = WaitingToast();
      const url = "https://task-manager-33dh.onrender.com/server";
      const timeoutMs = 50000; // 40 seconds
      const intervalMs = 10000; // Log every 10 seconds

      // Create a function to handle the Axios request
      const axiosRequest = axios.get(url, { timeout: timeoutMs });

      // Create a progress logger
      let elapsed = 0;
      const interval = setInterval(() => {
        elapsed += intervalMs / 1000; // Convert to seconds
        console.log(`Waiting for response... ${elapsed}s elapsed`);
        if (elapsed == 10) {
          notify("We're getting things ready for you...", "😊");
        } else if (elapsed == 20) {
          notify("We’re almost there, just a few more seconds", "😁");
        } else if (elapsed == 30) {
          notify("Taking longer than usual", "😓")
        }
      }, intervalMs);

      try {
        const response = await axiosRequest; // Wait for Axios to complete
        if (response.status === 200) {
          successToast(waitId);
        }
        setTimeout(() => {
          notify("You are ready to go", "👍");
        }, 2500);
      } catch (error) {
        if (error.code === "ECONNABORTED") {
          failureToast(waitId);
        } else {
          failureToast(waitId);
          setTimeout(() => {
            notify("Please try again later", "😓");
          }, 3500);
          console.error("Request failed:", error.message);
        }
      } finally {
        clearInterval(interval); // Clear the interval when request completes
      }
      // try {
      //   const waitId = WaitingToast();
      //   const response = await axios.get(
      //     "https://task-manager-33dh.onrender.com/server"
      //   );
      //   console.log(response);

      //   if (response.status === 200) {
      //     successToast(waitId);
      //     await setTimeout(() => {
      //       notify("Server is UP!!", "🫰🏼");
      //     }, 2000);
      //   } else {
      //     failureToast(waitId);
      //     setTimeout(() => {
      //       notify("Server is loading please wait", "😓");
      //     }, 25000);
      //   }
      // } catch (error) {
      //   console.error("Error:", error);
      // }
    };
    fetchData();
  }, []);

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
  }, []);

  const handleLogin = (email, password) => {
    if (
      userData &&
      checkCredentials({ email, password }, userData.adminData, "admin")
    ) {
      setUser("admin");
    } else if (
      userData &&
      checkCredentials({ email, password }, userData.empData, "emp")
    ) {
      setUser("emp");
    } else {
      alert("Invalid Credentials");
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <>
      <Toaster />

      {user ? "" : <Login handleLogin={handleLogin} />}
      {user == "emp" && loggedInUserData ? (
        <EmpDashboard
          logout={logout}
          data={loggedInUserData}
          setData={setLoggedInUserData}
        />
      ) : (
        ""
      )}
      {user == "admin" ? (
        <AdminDashboard
          logout={logout}
          data={loggedInUserData}
          setData={setLoggedInUserData}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default App;
