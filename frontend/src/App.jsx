import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>MERN Application</h1>

      <h2>Users</h2>

      {users.map((user) => (
        <div key={user._id}>
          <p>Name: {user.name}</p>
          <p>Age: {user.age}</p>
          <p>City: {user.city}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;
