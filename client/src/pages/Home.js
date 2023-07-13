import React, { useState, useEffect } from "react";

const Home = () => {
  const [searchInput, setSearchInput] = useState("");
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

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

  const renderEmployees = () => {
    if (filteredEmployees.length === 0) {
      return <p>No employees found.</p>;
    }

    return (
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
              <td>{employee.salary}</td>
              <td>{employee.role}</td>
              <td>{employee.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="searchbar">
      <form className="search" onSubmit={(e) => e.preventDefault()}>
        <input
          value={searchInput}
          onChange={(e) => handleSearch(e.target.value)}
          type="text"
          placeholder="Search for an employee"
        />
      </form>

      {/* Render the filtered employees */}
      {renderEmployees()}
    </div>
  );
};

export default Home;
