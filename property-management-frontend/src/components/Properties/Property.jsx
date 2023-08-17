import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProperties } from "../../store/property/property";
import {
  fetchFavorites,
  addToFavorites,
  removeFromFavorites,
} from "../../store/favorite/favorite";
import AuthService from "../../services/AuthService";
import WaitLoader from "../Spinners/WaitLoader";
import { toast } from "react-hot-toast";
import Button from "react-bootstrap/Button";
export default function Property({ favorite }) {
  const location = useLocation();
  let isFavorite = favorite;
  if (location === "/my-favorites") {
    isFavorite = true;
  }
  const properties = useSelector((state) =>
    isFavorite ? state.favorite.properties : state.property.properties
  );
  const favorites = useSelector((state) => state.favorite.properties);
  const userDetail = useSelector((state) => state.auth.user_detail);
  const navigate = useNavigate();
  const isAuthenticated = AuthService.isAuthenticated();

  function saveToFavorite(id) {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      dispatch(addToFavorites(id))
        .then((response) => {
          toast.success("Saved to favorite successfully");
          dispatch(fetchProperties());
          dispatch(fetchFavorites());
        })
        .catch((err) => {
          toast.error("Something went wrong");
        });
    }
  }
  function removeFromFavoriteList(id) {
    const isAuthenticated = AuthService.isAuthenticated();
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      dispatch(removeFromFavorites(id))
        .then((response) => {
          toast.success("Removed from favorite successfully");
          dispatch(fetchProperties());
          dispatch(fetchFavorites());
        })
        .catch((err) => {
          toast.error("Something went wrong");
        });
    }
  }
  const dispatch = useDispatch();
  useEffect(() => {
    if (isFavorite) {
      dispatch(fetchFavorites());
    } else {
      dispatch(fetchProperties());
      dispatch(fetchFavorites());
    }
  }, []);
  const propertiesComponent =
    properties &&
    properties.map((item) => {
      return (
        <React.Fragment>
          <Card style={{ width: "20rem" }} className="mb-5">
            <Card.Img
              className="property-card-image"
              variant="top"
              src={"data:image/jpeg;base64," + item.image}
            />
            <div className="favorite">
              <div className="status">
                <Button
                  variant={
                    item.status === "AVAILABLE"
                      ? "outline-success"
                      : "outline-primary"
                  }
                >
                  {item.status}
                </Button>
              </div>
              {!isAuthenticated ||
              (userDetail && userDetail.role == "CUSTOMER") ? (
                <div className="fav-icon">
                  {favorite || favorites.find((fav) => fav.id == item.id) ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-heart-fill"
                      viewBox="0 0 16 16"
                      onClick={(e) => {
                        removeFromFavoriteList(item.id);
                      }}
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-heart"
                      viewBox="0 0 16 16"
                      onClick={(e) => {
                        saveToFavorite(item.id);
                      }}
                    >
                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                    </svg>
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="property-spec">
              <span>{item.bed} bds | </span> <span> {item.bath} ba</span>
            </div>
            <Link to={`/property/${item.id}`}>
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>$ {item.price}</Card.Text>
                <Card.Text>{item.address}</Card.Text>
              </Card.Body>
            </Link>
            <div className="propertyOption">{item.propertyOption}</div>
          </Card>
        </React.Fragment>
      );
    });

  return (
    <React.Fragment>
      <WaitLoader></WaitLoader>
      {propertiesComponent}
    </React.Fragment>
  );
}
