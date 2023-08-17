import BarChart from "../../Charts/BarChart";
import DonutChart from "../../Charts/DonutChart";
import LineChart from "../../Charts/LineChart";
import { useSelector, useDispatch } from "react-redux";
import { fetchAdminDashboardData } from "../../../store/dashboard/dashboard";
import "./Dashboard.css";
import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";

const Dashboard = () => {
  const data = useSelector((state) => state.dashboard.adminDashboardData);
  return (
    <React.Fragment>
      <div className="top10RentedProperty">
        <h5>Last 10 Rented Properties</h5>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Property</th>
              <th>Owner</th>
              <th>Price</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.top10ContingentProperties &&
              data.top10ContingentProperties.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.title}</td>
                  <td>{item.owner}</td>
                  <td>{item.price}</td>
                  <td>{item.state}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
      <div id="chart">
        <div className="donut">
          <h5>Property Type Wise Property Count</h5>
          <DonutChart fetchMethod={fetchAdminDashboardData}></DonutChart>
        </div>
        <div className="bar">
          <h5>State Wise Property Count</h5>
          <BarChart fetchMethod={fetchAdminDashboardData}></BarChart>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
