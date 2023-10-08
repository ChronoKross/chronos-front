import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Grow, Alert, Typography } from "@mui/material";

function Stack() {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  const [registerDate, setRegisterDate] = useState([]);
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    axios.get("https://repreveback-end.onrender.com/employee").then((res) => {
      setEmployees(res.data);
    });
  }, []);

  let admin = localStorage.getItem("admin");

  const handleClick = (clickedName) => {
    // Create a copy of the employees array
    const updatedStack = [...employees];
    // Filter out the clickedName
    const filteredStack = updatedStack.filter(
      (employee) => employee !== clickedName
    );
    // Push the clickedName to the end of the array
    filteredStack.push(clickedName);
    filteredStack.map((employee, i) => (employee.position = i + 1));
    // Update the state with the modified array
    setEmployees(filteredStack);

    const today = new Date();

    const templateMessage = `${
      clickedName.name
    } left at ${today.toLocaleString()}`;

    const tempRegisterDateArray = [...registerDate];

    tempRegisterDateArray.unshift(templateMessage);

    setRegisterDate(tempRegisterDateArray);
  };

  const handlePatch = async () => {
    await axios
      .patch("https://repreveback-end.onrender.com/employee", employees)
      .then((res) => {
        // console.log(res.data);
        setAlertMessage("Database updated.");
        setAlertSeverity("success");
        setAlertOpen(true);
      });
  };

  return (
    <main
      className="flex items-center justify-center flex-col gap-y-5 "
      style={{
        overflowY: "hidden",
      }}
    >
      <div className="text-center gap-3 w-3/4">
        {employees.map((employee, index) => (
          <button
            key={index}
            className="w-full py-3 px-4 my-1 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibdivd bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800 md:flex md:flex-col md:gap-1 "
            onClick={() => handleClick(employee, index)}
          >
            {employee.name}
          </button>
        ))}
      </div>
      {admin && (
        <button
          type="button"
          className="rounded-md w-20 h-10 bg-slate-800 text-neutral-300"
          onClick={handlePatch}
        >
          PATCH
        </button>
      )}
      <Grow in={alertOpen} mountOnEnter unmountOnExit>
        <Alert onClose={() => setAlertOpen(false)} severity={alertSeverity}>
          {alertMessage}
        </Alert>
      </Grow>

      <div className=" h-60 overflow-y-hidden">
        {registerDate.map((register, index) => (
          <Typography
            key={`register-date-${index}`}
            variant="body1"
            color="white"
          >
            {register}
          </Typography>
        ))}
      </div>
    </main>
  );
}

export default Stack;
