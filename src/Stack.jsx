import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Box, Grow, Alert } from "@mui/material";

function Stack() {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/employee").then((res) => {
      setEmployees(res.data);
    });
  }, []);

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
  };

  const handlePatch = async () => {
    await axios
      .patch("http://localhost:3000/employee", employees)
      .then((res) => {
        console.log(res.data);
        // alert("database updated")
        setAlertMessage("Database updated.");
        setAlertSeverity("success");
        setAlertOpen(true);
      });
  };

  return (
    <main className="flex items-center justify-center flex-col gap-y-5 h-screen w-screen">
      {/* <Box
        id="test-div"
        sx={{
          height: "50%",
          backgroundColor: {
            xs: "red",
            sm: "green",
            md: "blue",
            lg: "yellow",
            xl: "pink",
          },
        }}
      >
        Test Test Test
      </Box> */}

      <div className="grid text-center gap-3 w-3/4">
        {employees.map((employee, index) => (
          <button
            key={index}
            className=" w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibdivd bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
            onClick={() => handleClick(employee, index)}
          >
            {employee.name}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="rounded-md w-20 h-10 bg-slate-800 text-neutral-300"
        onClick={handlePatch}
      >
        PATCH
      </button>
      <Grow in={alertOpen} mountOnEnter unmountOnExit>
        <Alert onClose={() => setAlertOpen(false)} severity={alertSeverity}>
          {alertMessage}
        </Alert>
      </Grow>
    </main>
  );
}

export default Stack;
