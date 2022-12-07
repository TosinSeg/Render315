import React, { Component, useEffect, useState } from 'react';
import Table from "../components/table.jsx";
import Navbar from './navbar';

function Employee(props) {

    const [employee, setEmployee] = useState([]);
    const [employeename, setName] = useState('Employee Name');
    const [id, setId] = useState(0);

    const getEmployee = async () => {
        const response = await fetch("http://localhost:5001/employeeReport");
        const jsonData = await response.json();
        console.log(jsonData)
        console.log("hell")
        setEmployee(jsonData)
    }

    const addNewEmployee = async (e) => {
        e.preventDefault();
        const body = {"id": id, "employeename": employeename};
        const respone = await fetch("http://localhost:5001/addEmployee", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body),
        });
        await getEmployee();
    }

    useEffect(() => {
        getEmployee();
    }, [])
    return (
        
        <React.Fragment>
        <Navbar lang={props.lang}/>    
        <div class='heading'>
            <h1>Staff</h1>
            <p>View top selling employees and add new employees to the staff</p>
            <hr></hr><br></br>
        </div> 

        <Table data={employee} column={props.column}/> 
        <br></br><br></br>
        <h1>Add a New Employee</h1>
        <p>Add a new employee to the staff by entering the id and the name of the new employee</p><br></br><br></br>
        <form onSubmit={getEmployee}>
                <label for="id">Employee ID:</label>
                <input type="text" className='form-control1' id='id' value={id} onChange={e => setId(e.target.value)}/>
                <label for="name">Employee Name:</label>
                <input type="text" className='form-control1' id='name' value={employeename} onChange={e => setName(e.target.value)}/>
                <br></br><br></br><br></br>
                <button onClick={addNewEmployee} class="button">Submit</button>
                <br></br><br></br><br></br><br></br><br></br>
        </form>

        </React.Fragment>
         
    );
}

export default Employee;