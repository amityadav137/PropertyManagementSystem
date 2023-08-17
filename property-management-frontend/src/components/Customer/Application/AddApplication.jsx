import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import toast from 'react-hot-toast';
import {
  setMakeAnOfferModal,
  submitApplication,
} from "../../../store/application/application";
import { useParams } from "react-router-dom";
export default function AddApplication() {
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false)
  const { id } = useParams();
  const formRef = useRef();
  const showMakeAnOfferModal = useSelector(
    (state) => state.application.showMakeAnOfferModal
  );
  function submitOfferApplication(event) {
    event.preventDefault();
    setLoading(true)
    const formData = formRef.current;
    const requestData = {
      offerPrice: formData["offer_price"].value,
      remarks: formData["remarks"].value,
      propertyId: id,
    };
    if (formData.checkValidity() === false) {
        setLoading(false)
        event.stopPropagation();
    }
    else{
    dispatch(submitApplication(requestData))
      .then((res) => {
        toast.success("Offer Application Submitted Successfully");
        dispatch(setMakeAnOfferModal(false))
        setLoading(false)
    })
      .catch((er) => {setLoading(false)});
    }
    setValidated(true);
}
  return (
    <React.Fragment>
      <Modal
        show={showMakeAnOfferModal}
        onHide={() => dispatch(setMakeAnOfferModal(false))}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Make an offer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            validated={validated}
            ref={formRef}
            onSubmit={(e) => submitOfferApplication(e)}
          >
            <div className="row">
              <Form.Group className="mb-4" controlId="formBasicTitle">
                <Form.Label>Offer Price</Form.Label>
                <Form.Control
                  required
                  type="number"
                  name="offer_price"
                  placeholder="Please offer your price"
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="formBasicTitle">
                <Form.Label>Remarks</Form.Label>
                <Form.Control
                  as="textarea"
                  required
                  type="text"
                  placeholder="Remarks"
                  name="remarks"
                />
              </Form.Group>

              <Button type="submit" variant="primary" disabled={loading}>
                Submit
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}
