import { useState, useEffect } from "react";
import Card from "../components/Card";

const Home = () => {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3002/api/employees")
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data);
        console.log(data);
      });
  }, []);

    return (
      //add keys too
      <div className="home">
        {employees.map((employee) => (
          <Card employee={employee} key={employee._id}/>
        ))}
      </div>
    );
  };
  
  export default Home;
  