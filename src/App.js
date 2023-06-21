import { useState } from "react";
import "./App.css";

const API_URL = process.env.API_URL ?? "http://localhost:8000/students";

function fetchStudents() {
  return fetch(`${API_URL}/students/all`).then((response) => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    console.log("Students fetched successfully", response);
    return response.json();
  });
}

function createStudent(studentInfo) {
  return fetch(`${API_URL}/students`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(studentInfo),
  })
    .then((data) => console.log("Student created successfully", data))
    .catch((error) => {throw new Error(error)});
}

function App() {
  const [students, setStudents] = useState([]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleClickGet = () => {
    fetchStudents().then((data) => {
      setStudents(data);
    });
  };

  const handleClickCreate = (event) => {
    event.preventDefault(); // Prevent form submit
    createStudent({ first_name: firstName, last_name: lastName });
  };

  return (
    <div className="App">
      <section>
        <form>
          <input
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            placeholder="First name"
          />
          <input
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            placeholder="Last name"
          />

          <button onClick={handleClickCreate}>Add Student</button>
        </form>
      </section>
      <section>
        <button onClick={handleClickGet}>Fetch Students</button>
        <ul>
          {students.map((student) => (
            <li>{student.first_name} {student.last_name}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
