import axios from "axios";

const url = https://task-manager-33dh.onrender.com
const fetchData = async () => {
  try {
    const token = await localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Format the token as "Bearer <token>"
    };

    const response = await axios.get(`${url}/allData`, { headers });
    return response.data || []; // Return the data or an empty array if no data
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return []; // Return an empty array in case of error
  }
};

const fetchTasks = async () => {
  try {
    const token = await localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Format the token as "Bearer <token>"
    };

    const response = await axios.get(`${url}/tasks`, { headers });
    return response.data || []; // Return the data or an empty array if no data
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return []; // Return an empty array in case of error
  }
};

export { fetchData, fetchTasks };
