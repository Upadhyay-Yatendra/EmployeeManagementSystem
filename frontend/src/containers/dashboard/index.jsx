import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MetaTags from "../../components/meta-tags";
import { mapDashboardData } from "../../data/dashboardData.js";
import MainSection from "./main-section.jsx";
import TopSection from "./top-section.jsx";
import "./styles.scss";
import Loader from "../../components/loader";
import SearchBar from "./SearchBar";
import TableComponent from "../../components/table/SearchTable/TableComponent";


import {
  getAllEmployees,
  getEmployeesCount,
} from "../../services/employees/allEmployees";

const Dashboard = () => {
  const [searchText, setSearchText] = useState("");
  const [dashboardData, setDashboardData] = useState(mapDashboardData());
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const syncDashboard = async () => {
    setLoading(true);
    const response = await getAllEmployees();
    setDashboardData(mapDashboardData({}, response.body.data));
    setLoading(false);
  };

  const {recentCustomers} = dashboardData.mainSection;
  console.log("DashboardData-",dashboardData)
  useEffect(() => {
    syncDashboard();
  }, []);
  // console.log("\nSearchText-", searchText);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <MetaTags {...dashboardData.metaData} />
        <TopSection {...dashboardData.mainSection} navigate={navigate} />
        <MainSection {...dashboardData.mainSection} />
        <SearchBar setSearchText={setSearchText} />
        <TableComponent searchText={searchText} recentCustomers={recentCustomers} />

      </div>
    </div>
  );
};

export default Dashboard;
