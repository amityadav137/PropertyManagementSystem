import React, { useEffect, useState } from "react";
import ImageCarousel from "../ImageCarousel/ImageCarousel";
import { fetchPropertyDetail } from "../../store/property/property";
import { setMakeAnOfferModal } from "../../store/application/application";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import AddApplication from "../Customer/Application/AddApplication";
import AuthService from "../../services/AuthService";
import { useNavigate } from "react-router-dom";

export default function PropertyDetail() {
  const { id } = useParams();
  const propertyDetail = useSelector((state) => state.property.propertyDetail);
  const userDetail = useSelector((state) => state.auth.user_detail);
  const showMakeAnOfferModal = useSelector(
    (state) => state.application.showMakeAnOfferModal
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = AuthService.isAuthenticated();

  function makeAnOfferModal() {
    if (isAuthenticated) {
      dispatch(setMakeAnOfferModal(true));
    } else {
      navigate("/login");
    }
  }
  useEffect(() => {
    dispatch(fetchPropertyDetail(id));
  }, []);

  return (
    <React.Fragment>
      <div className="Banner">
        <img src="/banner.jpeg" alt="Banner" />
      </div>
      <div className="propertyOptionDetail">
        {propertyDetail.propertyOption}
      </div>
      <div className="Property-detail">
        <div className="propertyTitle">
          <h4>{propertyDetail.title}</h4>
          {!isAuthenticated ||
          (userDetail &&
            userDetail.role == "CUSTOMER" &&
            propertyDetail.propertyStatus === "AVAILABLE") ? (
            <button onClick={() => makeAnOfferModal()}>Make an offer</button>
          ) : (
            ""
          )}
        </div>
        <h5>${propertyDetail.price}</h5>
        <h6>
          {propertyDetail &&
            propertyDetail.address &&
            propertyDetail.address.street +
              ", " +
              propertyDetail.address.city +
              ", " +
              propertyDetail.address.state}
        </h6>
        <p>
          {propertyDetail &&
            propertyDetail.propertyDetail &&
            propertyDetail.propertyDetail.description}
        </p>
        <div className="Property-images">
          <ImageCarousel detail={propertyDetail}></ImageCarousel>
        </div>
        <div className="Property-specification">
          <div className="Detail">
            <h5 className="title">Property Details</h5>
            <div className="P-data">
              <span>
                Bedrooms:{" "}
                {propertyDetail.propertyDetail &&
                  propertyDetail.propertyDetail.bed}
              </span>
              <span>
                Bathrooms:{" "}
                {propertyDetail.propertyDetail &&
                  propertyDetail.propertyDetail.bath}
              </span>
              <span>
                Basement:{" "}
                {propertyDetail.propertyDetail &&
                propertyDetail.propertyDetail.hasBasement === true
                  ? "Yes"
                  : "No"}
              </span>
              <span>
                Parking:{" "}
                {propertyDetail.propertyDetail &&
                propertyDetail.propertyDetail.hasParking === true
                  ? "Yes"
                  : "No"}
              </span>
              <span>
                Built Year:{" "}
                {propertyDetail.propertyDetail && propertyDetail.builtYear}
              </span>
            </div>
          </div>
          <div className="Land-detail">
            <h5 className="title">Land Details</h5>
            <div className="L-data">
              <span>
                Area size:{" "}
                {propertyDetail.propertyDetail &&
                  propertyDetail.propertyDetail.area}{" "}
                Sq.ft
              </span>
            </div>
          </div>
        </div>
        {showMakeAnOfferModal && <AddApplication></AddApplication>}
      </div>
    </React.Fragment>
  );
}
