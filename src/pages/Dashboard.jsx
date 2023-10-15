import { useState, useEffect } from "react";
import axios from "axios";
import Chart from "chart.js/auto";

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

  useEffect(() => {
    // Create a chart after the employees data is loaded
    if (employees.length > 0) {
      createChart();
    }
  }, [employees]);

  const createChart = () => {
    const ctx = document.getElementById("hoursMissedChart").getContext("2d");

    // Transform employee data into a format suitable for the chart
    const chartData = {
      labels: employees.map((employee) => employee.name),
      datasets: [
        {
          label: "Hours Missed",
          data: employees.map((employee) =>
            employee.timeOff.reduce(
              (total, timeOff) => total + calculateHoursMissed(timeOff.time),
              0
            )
          ),
          backgroundColor: "rgba(75, 192, 192, 0.2)", // Customize chart colors
          borderColor: "rgba(75, 192, 192, 1)", // Customize chart colors
          borderWidth: 1,
        },
      ],
    };

    new Chart(ctx, {
      type: "bar",
      data: chartData,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  return (
    <div className="h-screen w-screen">
      <div className="flex justify-center items-center">
        <canvas id="hoursMissedChart" className=" w-screen h-screen"></canvas>
      </div>
    </div>
  );
}
