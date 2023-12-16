import React from "react";
import './addEmployee.scss'
import { sendErrorNotification } from "../../services/notifications";

const AddEmployee = () => {
    const handleAddEmployee = ()=>{
        // window.alert("I will add later AddEmployee .\nCould'nt add due to time restrictions.");
        sendErrorNotification("Add employee functionality is'nt working \nNeed some more time to make it functional \nRegards!!!");
    }
  return (
    <div>
      <div className="btn-container">
        {/* <h2>Admin Actions</h2> */}
        <button onClick={handleAddEmployee}>Add Employee</button>
        {/* Other admin-specific functionalities */}
      </div>
    </div>
  );
};

export default AddEmployee;
