import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import WaitLoader from "../../Spinners/WaitLoader";
import { RiDeleteBin5Fill, RiEdit2Fill } from "react-icons/ri";
import { BiShow, BiHide } from "react-icons/bi";
import { Badge, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  changeToContingent,
  fetchListings,
  revokeContingent,
  updatePropertyStatus,
} from "../../../store/myListings/myListings";
import { useNavigate } from "react-router-dom";
import "./MyProperties.css";
import { toast } from "react-hot-toast";
import { revokeContingentApi } from "../../../services/apis/Endpoints";

const MyProperties = () => {
  const listings = useSelector((state) => state.myListings.listings);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleUpdate = (propertyId) => {
    navigate(`/update-property/${propertyId}`);
  };

  const cancelContingency = (propertyId) => {
    dispatch(revokeContingent(propertyId))
      .then((res) => {
        toast.success(res.message);
        dispatch(fetchListings());
      })
      .catch((e) => {
        toast.error(e.message);
      });
  }

  const changeIsActiveStatus = (propertyId, action) => {
    dispatch(updatePropertyStatus(propertyId, action))
      .then((res) => {
        dispatch(fetchListings());
        toast.success(res.message);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  const resolvePropertyStatus = (propertyId) => {
    dispatch(changeToContingent(propertyId))
      .then((res) => {
        toast.success(res.message);
        dispatch(fetchListings());
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  useEffect(() => {
    dispatch(fetchListings());
  }, []);

  return (
    <React.Fragment>
      <WaitLoader />
      {!listings && (
        <div>
          <p>No Data</p>
        </div>
      )}
      {listings && (
        <div className="table-container">
          <div className="table-title">
            <p>My Properties</p>
            <Button
              className="add-property-btn"
              size="sm"
              variant="secondary"
              onClick={(e) => navigate("/add-property")}
            >
              Add Property
            </Button>
          </div>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th># S.N</th>
                <th>Property Title</th>
                <th>Address</th>
                <th>Views</th>
                <th>Offers</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((property, id) => {
                return (
                  <tr key={id}>
                    <td>{id + 1}</td>
                    <td>{property.title}</td>
                    <td>{property.address}</td>
                    <td>{property.viewCount}</td>
                    <td>{property.offerCount}</td>
                    <td className="status-container">
                      <Badge
                        bg={
                          property.propertStatus === "AVAILABLE"
                            ? "success"
                            : property.propertStatus === "PENDING"
                              ? "warning"
                              : "secondary"
                        }
                      >
                        {property.propertStatus}
                      </Badge>
                      {property.propertStatus === "CONTINGENT" && <Badge
                        onClick={e => cancelContingency(property.id)}
                        className="revoke-btn">CANCEL</Badge>}
                      {property.propertStatus === "PENDING" && (
                        <Badge
                          className="m-1 resolve-action-button"
                          onClick={(e) => resolvePropertyStatus(property.id)}
                          bg="primary"
                        >
                          Resolve
                        </Badge>
                      )}
                    </td>
                    <td className="icon-btn-container">
                      {property.isActive && (
                        <Button
                          className="icon-btn"
                          variant="outline-danger"
                          title="Hide Property"
                          onClick={(e) => {
                            console.log(property.isActive);
                            changeIsActiveStatus(property.id, "hide");
                          }}
                        >
                          <BiHide />
                        </Button>
                      )}
                      {!property.isActive && (
                        <Button
                          className="icon-btn"
                          variant="outline-success"
                          title="Show Property"
                          onClick={(e) => {
                            console.log(property.isActive);
                            changeIsActiveStatus(property.id, "show");
                          }}
                        >
                          <BiShow />
                        </Button>
                      )}
                      {property && property.propertStatus !== "CONTINGENT" && (
                        <Button
                          variant="outline-primary"
                          className="icon-btn"
                          title="Update Property"
                          onClick={(e) => handleUpdate(property.id)}
                        >
                          <RiEdit2Fill />
                        </Button>
                      )}
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

export default MyProperties;
