//create a component that takes in an employee object and creates a card for them 

import React from "react";

const cardStyle = {
    width: "200px",
    height: "200px",
    border: "1px solid black",
    margin: "10px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
};

const Card = ({ employee }) => {
    //create a card component in a box that displays the employee's name, email, phone number, and picture
    return (
        <div className="card" style={cardStyle}>
            <div className="card-content">
                <h3>{employee.name}</h3>
                <p>{employee.phone}</p>
                <p>{employee.salary}</p>
                <p>{employee.location}</p>
                <p>{employee.role}</p>
            </div>
        </div>
    );
};

export default Card;


