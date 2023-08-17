import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import WaitLoader from "../../Spinners/WaitLoader";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { Badge, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import "./MyPropertyOffers.css";
import {
  fetchPropertyOffers,
  updatePropertyOffersStatus,
} from "../../../store/myPropertyApplications/myPropertyApplications";

const MyPropertyOffers = () => {
  const offers = useSelector(
    (state) => state.myPropertyApplications.applications
  );

  const dispatch = useDispatch();

  const handleStatusChange = (command, offer) => {
    //  TODO HIT THE UPDATE API FOR OWNER PROPERTY APPLICATION TO CHANGE THE STATUS
    dispatch(updatePropertyOffersStatus(offer.id, command)).then((res) => {
      dispatch(fetchPropertyOffers());
    });
  };

  useEffect(() => {
    console.log("STATUS CHANGED");
    dispatch(fetchPropertyOffers());
  }, []);

  return (
    <React.Fragment>
      <WaitLoader />
      {!offers && (
        <div>
          <p>No Data</p>
        </div>
      )}
      {offers && (
        <div className="table-container">
          <div className="table-title">
            <p>Property Applications</p>
          </div>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th># S.N</th>
                <th>Property Title</th>
                <th>Offered By</th>
                <th>Offered Price</th>
                <th>Status</th>
                <th>Remarks</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer, id) => {
                return (
                  <tr key={id}>
                    <td>{id + 1}</td>
                    <td>{offer.propertyTitle}</td>
                    <td>{offer.offeredBy}</td>
                    <td>{offer.offerPrice}</td>
                    <td>
                      <Badge
                        bg={
                          offer.status === "PENDING"
                            ? "warning"
                            : offer.status === "REJECTED"
                              ? "danger"
                              : offer.status === "CANCELLED" ? "secondary"
                                : "success"
                        }
                      >
                        {offer.status}
                      </Badge>
                    </td>
                    <td>{offer.remarks}</td>
                    <td className="icon-btn-container">
                      <Button
                        onClick={(e) => handleStatusChange("APPROVED", offer)}
                        title="Approve"
                        className="icon-btn"
                        disabled={offer.status === "PENDING" ? false : true}
                        variant="outline-success"
                      >
                        <TiTick />
                      </Button>
                      <Button
                        onClick={(e) => handleStatusChange("REJECTED", offer)}
                        title="Reject"
                        className="icon-btn"
                        disabled={
                          offer.status === "REJECTED" ||
                            offer.status === "CONTRACTED" || offer.status === "CANCELLED"
                            ? true
                            : false
                        }
                        variant="outline-danger"
                      >
                        <RxCross2 />
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

export default MyPropertyOffers;
