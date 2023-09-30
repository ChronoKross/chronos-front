import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/employee").then((res) => {
      setEmployees(res.data);
    });
  }, []);

  const handleClick = (clickedName, index) => {
    // Create a copy of the employees array
    const updatedStack = [...employees];
    // Filter out the clickedName
    const filteredStack = updatedStack.filter(
      (employee) => employee !== clickedName
    );
    // Push the clickedName to the end of the array
    filteredStack.push(clickedName);
    filteredStack.map((employee, i) => employee.position = i+1)
    // Update the state with the modified array
    setEmployees(filteredStack);
  };

  const handlePatch = async () => {
    await axios.patch("http://localhost:3000/employee", employees).then(res =>
      console.log(res.data),
      alert("database updated")
    )
  }

  return (
    <main className="flex items-center justify-center flex-col gap-y-5 h-screen">
    <ol className="grid text-center">
      {employees.map((employee, index) => (
        <li
          key={index}
          className="container cursor-pointer text-xl font-semibold"
          onClick={() => handleClick(employee, index)}
        >
          {employee.position + " - " + employee.name}
        </li>
      ))}
    </ol>
    <button type="button" className="rounded-md w-20 h-10 bg-slate-800 text-neutral-300" onClick={handlePatch}>PATCH</button>
    </main>
  );
}

export default App;
