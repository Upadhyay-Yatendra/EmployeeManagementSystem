import React from "react";
import './addEmployee.scss'
const AddEmployee = ({ handleAddEmployee }) => {
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
