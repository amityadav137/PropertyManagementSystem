import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "./Application.css";
import WaitLoader from "../../Spinners/WaitLoader";
import { RiDeleteBin5Fill, RiFilePdfFill, RiFilePdfLine } from "react-icons/ri";
import { Badge, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchApplications,
  deleteApplication,
  downloadSalesPdf,
} from "../../../store/application/application";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Application = () => {
  const applications = useSelector((state) => state.application.applications);

  const dispatch = useDispatch();

  function deleteMyApplication(id) {
    dispatch(deleteApplication(id))
      .then((response) => {
        toast.success(response.message);
        dispatch(fetchApplications());
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }
  function downloadPdf(id) {
    dispatch(downloadSalesPdf(id));
  }
  useEffect(() => {
    dispatch(fetchApplications());
  }, []);

  return (
    <React.Fragment>
      <WaitLoader></WaitLoader>

      {applications && (
        <div className="table-container">
          <div className="table-title">
            <p>My Applications</p>
          </div>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th># ID</th>
                <th>Offer Price</th>
                <th>Remarks</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((item, id) => {
                return (
                  <tr>
                    <td>{id + 1}</td>
                    <td>{item.offerPrice}</td>
                    <td>{item.remarks}</td>
                    <td>
                      <Badge bg={item.status === "REJECTED" ?
                        "danger" :
                        item.status === "APPROVED" ? "success" : "primary"
                      }>{item.status || "PENDING"}</Badge>
                    </td>
                    <td className="icon-btn-container">
                      {item.status === "CONTRACTED" && (
                        <Button
                          title="Download Sales PDF"
                          className="icon-btn"
                          variant="info"
                          onClick={() => downloadPdf(item.id)}
                        >
                          <RiFilePdfLine />
                        </Button>
                      )}

                      <Button
                        title="Delete"
                        className="icon-btn"
                        variant="danger"
                        onClick={() => deleteMyApplication(item.id)}
                      >
                        <RiDeleteBin5Fill />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
    </React.Fragment>
  );
};

export default Application;
