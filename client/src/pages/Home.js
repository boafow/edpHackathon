import React, { useState, useEffect } from "react";

const Home = () => {
  const [searchInput, setSearchInput] = useState("");
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleEmployeeIdChange = (event) => {
    setEmployeeId(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignIn = (e) => {
    e.preventDefault();

    const requestBody = {
      employeeId: employeeId,
      password: password
    };

    // Make an API call to authenticate the user
    fetch("http://localhost:3002/api/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // Authentication successful
          setRole(data.employee.role);
          setAuthenticated(true);
        } else {
          // Authentication failed
          setAuthenticated(false);
        }
      })
      .catch((error) => {
        console.error("Error authenticating user:", error);
        setAuthenticated(false);
      });
  };

  useEffect(() => {
    fetch("http://localhost:3002/api/employees")
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data);
        setFilteredEmployees(data);
      });
  }, []);

  const handleSearch = (searchValue) => {
    setSearchInput(searchValue);
    const filtered = employees.filter((employee) =>
      employee.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredEmployees(filtered);
  };

  const renderSalary = (employee) => {
    if (authenticated && (employee.employeeId === employeeId || role === "HR" || employee.managerId === employeeId)) {
      return employee.salary;
    } else {
      return "--";
    }
  };

  return (
    <div className="home">
      {!authenticated ? (
        <div>
          <h2>Welcome to the Home Page</h2>
          <div>
            <label htmlFor="employeeId">Employee ID:</label>
            <input
              type="text"
              id="employeeId"
              value={employeeId}
              onChange={handleEmployeeIdChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button onClick={handleSignIn}>Sign In</button>
        </div>
      ) : (
        <div>
          <h2>You are signed in!</h2>
          <div className="searchbar">
            <form className="search" onSubmit={(e) => e.preventDefault()}>
              <input
                value={searchInput}
                onChange={(e) => handleSearch(e.target.value)}
                type="text"
                placeholder="Search for an employee"
              />
            </form>
          </div>
          <div className="results">
            {filteredEmployees.length === 0 ? (
              <p>No employees found.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Employee ID</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Salary</th>
                    <th>Role</th>
                    <th>Location</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map((employee) => (
                    <tr key={employee._id}>
                      <td>{employee.employeeId}</td>
                      <td>{employee.name}</td>
                      <td>{employee.phone}</td>
                      <td>{renderSalary(employee)}</td>
                      <td>{employee.role}</td>
                      <td>{employee.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;