import React, { useState, useEffect } from "react";
import axios from "axios";

const calculateHoursMissed = (clockOutTime) => {
  const shiftStart = 19; // 7 PM
  const shiftEnd = 7; // 7 AM
  const [hours, minutes] = clockOutTime.split(":");
  const clockOutHours = parseInt(hours, 10);
  let hoursMissed = 0;

  if (clockOutHours < shiftStart) {
    hoursMissed = shiftStart - clockOutHours;
  } else if (clockOutHours < shiftEnd) {
    hoursMissed = 0;
  } else {
    hoursMissed = clockOutHours - shiftEnd;
  }

  return hoursMissed;
};

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get("https://repreveback-end.onrender.com/employee")
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
            <ul>
              {employee.timeOff.map((timeOff, index) => (
                <li key={index}>
                  Clock-out Time: {timeOff.time} | Hours Missed:{" "}
                  {calculateHoursMissed(timeOff.time)} hours
                </li>
              ))}
            </ul>
            <p>{employee.name}</p>
            <p>{employee.position}</p>
            {/* Display other employee details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
}
