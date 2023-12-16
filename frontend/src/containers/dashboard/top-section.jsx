import React from "react";

const TopSection = ({ recentCustomers }) => {
  // Function to calculate the total number of employees
  const getTotalEmployees = () => {
    return recentCustomers.length;
  };

  // Function to calculate the average salary
  const getAverageSalary = () => {
    const totalSalaries = recentCustomers.reduce((sum, emp) => sum + emp.salary, 0);
    return (totalSalaries / recentCustomers.length).toFixed(2); // Calculate average and round to 2 decimal places
  };

  // Function to count the number of admin employees
  const getAdminCount = () => {
    const adminEmployees = recentCustomers.filter(emp => emp.role === 'admin');
    return adminEmployees.length;
  };

  return (
    <div className="top-section">
    <h2 className="top-section-heading">Key Metrics</h2>
      <div className="cardBox">
        {/* Total Employees Card */}
        <div className="card">
          <div>
            <div className="numbers">{getTotalEmployees()}</div>
            <div className="cardName">Total Employees</div>
          </div>
          <div className="iconBx">
            <ion-icon name="people"></ion-icon>
          </div>
        </div>
        {/* Average Salary Card */}
        <div className="card">
          <div>
            <div className="numbers">{getAverageSalary()}</div>
            <div className="cardName">Avg. Salary</div>
          </div>
          <div className="iconBx">
            <ion-icon name="wallet"></ion-icon>
          </div>
        </div>
        {/* Admin Employees Card */}
        <div className="card">
          <div>
            <div className="numbers">{getAdminCount()}</div>
            <div className="cardName">Admin Employees</div>
          </div>
          <div className="iconBx">
          <ion-icon name="lock-closed"></ion-icon>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSection;
