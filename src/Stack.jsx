import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Grow, Alert, Typography } from "@mui/material";

function Stack() {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("info");

  const [registerDate, setRegisterDate] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [admin, setAdmin] = useState(localStorage.getItem("admin"));

  useEffect(() => {
    axios.get("https://repreveback-end.onrender.com/employee").then((res) => {
      setEmployees(res.data);
    });

    // Check if the alert has been shown previously
    const alertShown = localStorage.getItem("alertShown");

    if (!alertShown) {
      // Display the alert only on the first render
      setAlertMessage(
        "If someone volunteers to leave, click their name, and it will place them at the bottom of the stack. You must log in to edit the stack. Username: test Password: test (after you have finished make sure to hit PATCH or it will NOT save to the database)"
      );
      setAlertSeverity("info");
      setAlertOpen(true);

      // Set the flag in localStorage to indicate that the alert has been shown
      localStorage.setItem("alertShown", "true");
    }
  }, []);

  const handleClick = (clickedName) => {
    if (!admin) {
      setAlertMessage("You must be logged in to make changes.");
      setAlertSeverity("error");
      setAlertOpen(true);
      return;
    }

    const updatedStack = [...employees];
    const filteredStack = updatedStack.filter(
      (employee) => employee !== clickedName
    );
    filteredStack.push(clickedName);
    filteredStack.map((employee, i) => (employee.position = i + 1));
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
        setAlertMessage("Database updated.");
        setAlertSeverity("success");
        setAlertOpen(true);
      });
  };

  return (
    <main
      className="flex items-center justify-center flex-col gap-y-5"
      style={{
        overflowY: "hidden",
      }}
    >
      <div className="text-center gap-3 w-3/4">
        {employees.map((employee, index) => (
          <button
            key={index}
            className="w-full py-3 px-4 my-1 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibdivd bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800 md:flex md:flex-col md:gap-1"
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

      <div className="h-60 overflow-y-hidden">
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
