import React, { useEffect } from "react";
import Chart from "chart.js/auto";
import "./main-section-style.scss";

const MainSection = ({ recentCustomers }) => {
  
  useEffect(() => {
    let roleChartInstance;
    let salaryChartInstance;

    const createRoleChart = () => {
      if (roleChartInstance) {
        roleChartInstance.destroy(); // Destroy the existing chart instance
      }

      const roleCount = recentCustomers.reduce((acc, emp) => {
        acc[emp.role] = (acc[emp.role] || 0) + 1;
        return acc;
      }, {});

      const roleNames = Object.keys(roleCount);
      const roleCounts = Object.values(roleCount);

      const roleChart = document.getElementById("roleChart");

      roleChartInstance = new Chart(roleChart, {
        type: "pie",
        data: {
          labels: roleNames,
          datasets: [
            {
              label: "Role Distribution",
              data: roleCounts,
              backgroundColor: [
                "rgba(255, 99, 132, 0.8)",
                "rgba(54, 162, 235, 0.8)",
                // Add more colors if needed...
              ],
              borderWidth: 1,
            },
          ],
        },
      });
    };

    const createSalaryHistogram = () => {
      if (salaryChartInstance) {
        salaryChartInstance.destroy(); // Destroy the existing chart instance
      }

      // const salaries = recentCustomers.map((emp) => emp.salary);

      const salaryChart = document.getElementById("salaryChart");

      const salaryRanges = []; // Define the salary ranges
      const employeesInRanges = []; // Count of employees in each range
      // Calculate salary ranges and count employees falling into those ranges
      // Example: Divide salaries into ranges like $0-$10,000, $10,001-$20,000, and so on
      // Calculate the number of employees in each range

      // Example calculation (Replace this with your logic):
      const minSalary = Math.min(...recentCustomers.map((emp) => emp.salary));
      const maxSalary = Math.max(...recentCustomers.map((emp) => emp.salary));
      const range = 1000; // Define the range (adjust as needed)

      for (let i = minSalary; i <= maxSalary; i += range) {
        const employeesInRange = recentCustomers.filter(
          (emp) => emp.salary >= i && emp.salary < i + range
        ).length;
        salaryRanges.push(`${i}-${i + range}`);
        employeesInRanges.push(employeesInRange);
      }

      salaryChartInstance = new Chart(salaryChart, {
        type: "bar",
        data: {
          labels: salaryRanges, // Use the salary ranges as x-axis labels
          datasets: [
            {
              label: "Number of Employees",
              data: employeesInRanges, // Number of employees in each salary range
              backgroundColor: "rgba(54, 162, 235, 0.8)", // Example color
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Number of Employees",
              },
            },
            x: {
              title: {
                display: true,
                text: "Salary",
              },
            },
          },
        },
      });
    };

    createRoleChart();
    createSalaryHistogram();

    return () => {
      if (roleChartInstance) {
        roleChartInstance.destroy(); // Cleanup chart instance on component unmount
      }
      if (salaryChartInstance) {
        salaryChartInstance.destroy(); // Cleanup chart instance on component unmount
      }
    };
  }, [recentCustomers]);

  return (
    <>
      <h2 className="visualisations-heading">Visualisations</h2>
      <div className="chart-container">
        {/* Chart 1: Role Distribution */}
        <div className="chart-item">
          <canvas id="roleChart" width="400" height="400"></canvas>
        </div>

        {/* Chart 2: Salary Distribution */}
        <div className="chart-item">
          <canvas id="salaryChart" width="400" height="400"></canvas>
        </div>
      </div>
    </>
  );
};

export default MainSection;
