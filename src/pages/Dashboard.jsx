import { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get("https://repreveback-end.onrender.com/employee") // Replace with the actual API endpoint
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }, []);

  return (
    <div className="h-screen w-screen flex justify-center items-center text-4xl font-bold text-white bg-gray-950">
      <div>
        {employees.map((employee) => (
          <div key={employee._id}>
            {employee.timeOff.map((timeOff) => {
              <ul>
                <li>{timeOff}</li>
              </ul>;
            })}
            <p>{employee.name}</p>
            <p>{employee.position}</p>
            {/* Display other employee details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
}
