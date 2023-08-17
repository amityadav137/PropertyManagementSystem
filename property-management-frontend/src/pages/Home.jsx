import React, { useRef } from "react";
import Property from "../components/Properties/Property";
import { Button, Form, InputGroup } from "react-bootstrap";
import propertyTypes from "../static/PropertyType/PropertyType";
import unitedStates from "../static/States/State";
import { fetchProperties } from "../store/property/property";
import { useDispatch } from "react-redux";
const Home = () => {
  const addressStates = unitedStates;

  const priceRef = useRef();
  const roomSizeRef = useRef();
  const propertyTypeRef = useRef();
  const propertyOptionRef = useRef();
  const locationRef = useRef();

  const dispatch = useDispatch();
  function filterProperties() {
    dispatch(
      fetchProperties({
        price: priceRef.current.value || null,
        roomSize: roomSizeRef.current.value || null,
        propertyOption:
          (propertyOptionRef.current.value != "null" &&
            propertyOptionRef.current.value) ||
          null,
        propertyType:
          (propertyTypeRef.current.value != "null" &&
            propertyTypeRef.current.value) ||
          null,
        location:
          (locationRef.current.value != "null" && locationRef.current.value) ||
          null,
      })
    );
  }
  return (
    <React.Fragment>
      <div className="Banner">
        <img src="/banner.jpeg" alt="Banner" />
      </div>

      <div className="Property-container">
        <p className="Property-title">Properties</p>
        <div className="filterProperty">
          <div>
            <Form.Group className="mb-4" controlId="formBasicPrice">
              <Form.Control
                ref={priceRef}
                type="number"
                rows={1}
                placeholder="Price"
                name="propertyDescription"
              />
            </Form.Group>
          </div>
          <div>
            <Form.Group className="mb-4" controlId="formBasicRoom">
              <Form.Control
                ref={roomSizeRef}
                type="number"
                rows={1}
                placeholder="No of rooms"
                name="roomSize"
              />
            </Form.Group>
          </div>
          <div>
            <Form.Group className="mb-4" controlId="formBasicPropertyType">
              <Form.Select
                ref={propertyTypeRef}
                placeholder="Choose Property Type"
                name="propertyType"
              >
                <option value="null">All</option>
                {propertyTypes.map((p) => {
                  return <option value={p}>{p}</option>;
                })}
              </Form.Select>
            </Form.Group>
          </div>
          <div>
            <Form.Group className="mb-4" controlId="formBasic">
              <Form.Select
                ref={propertyOptionRef}
                placeholder="Choose Property Option"
                name="propertyOption"
              >
                <option value="null">All</option>
                <option value={"RENTAL"}>Rental</option>
                <option value={"SALES"}>Sale</option>
                <option value={"MORTGAGE"}>Mortgage</option>
              </Form.Select>
            </Form.Group>
          </div>
          <div>
            <Form.Group className="mb-4" controlId="formBasicState">
              <Form.Select
                placeholder="Choose State"
                name="location"
                ref={locationRef}
              >
                <option value="null">All</option>
                {addressStates.map((state) => {
                  return (
                    <option key={state.abv} value={state.name}>
                      {state.name}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
          </div>
          <div>
            <Button variant="primary" onClick={() => filterProperties()}>
              Filter
            </Button>
          </div>
        </div>
        <div className="Property-list">
          <Property></Property>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Home;
