import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import propertyTypes from '../../static/PropertyType/PropertyType'
import unitedStates from '../../static/States/State'
import "./AddProperty.css"
import { RiDeleteBin5Fill } from "react-icons/ri";
import { toast } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addProperty, addPropertyImage, fetchPropertyById, getPropertyById, updatePropertyById } from '../../store/myListings/myListings'

const AddProperty = () => {


    const dispatch = useDispatch()

    const addressStates = unitedStates
    const [hasBasement, setHasBasement] = useState(false)
    const [hasParking, setHasParking] = useState(false)
    const [selectedImage, setSelectedImage] = useState()
    const [imagePreview, setImagePreview] = useState()
    const [validated, setValidated] = useState()
    const [imageError, setImageError] = useState("")
    const formRef = useRef()

    // const [propertyData, setPropertyData] = useState([])

    const navigate = useNavigate()

    const { propertyId } = useParams()

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = formRef.current
        if (formData.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            const {
                propertyTitle,
                propertyDescription,
                propertyArea,
                propertyOption,
                propertyType,
                builtYear,
                street,
                city,
                state,
                zipCode,
                hasBasement,
                hasParking,
                numberOfbed,
                numberOfbaths,
                propertyPrice,
                propertyImage
            } = formRef.current;

            const property = {
                "title": propertyTitle.value,
                "description": propertyDescription.value,
                "bed": numberOfbed.value,
                "bath": numberOfbaths.value,
                "hasBasement": hasBasement.value,
                "price": propertyPrice.value,
                "hasParking": hasParking.value,
                "area": propertyArea.value,
                "propertyOption": propertyOption.value,
                "propertyType": propertyType.value,
                "street": street.value,
                "city": city.value,
                "state": state.value,
                "zipcode": zipCode.value,
                "builtYear": builtYear.value
            }


            console.log(property)

            if (propertyId) {
                dispatch(updatePropertyById(propertyId, property))
                    .then((res) => {
                        navigate("/my-properties")
                        toast.success(res.message)
                    }).catch((e) => {
                        toast.error(e.message)
                    })
            }

            if (!propertyId && selectedImage) {
                // Details add for property
                dispatch(addProperty(property))
                    .then((res) => {
                        console.log(res)
                        // Add image of the property
                        dispatch(addPropertyImage(res.data, selectedImage))
                    }).then((res) => {
                        navigate("/my-properties")
                        toast.success("Property Added Successfully!")
                    })
                    .catch((e) => {
                        toast.error(e.message)
                    })
            }

        }

        setValidated(true);
    }


    const handleImage = (e) => {
        const formData = formRef.current
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedImage(undefined)
            return
        }

        setSelectedImage(e.target.files[0])

        if (e.target.files[0].size > 500000) {
            setImageError("Image size must be less than 500 KB!")
            const { propertyImage } = formRef.current
            propertyImage.value = null
            setSelectedImage(null)
            // setImageError("")
        } else {
            setImageError("")
        }


    }

    const removeSelectedImage = (e) => {
        const { propertyImage } = formRef.current
        propertyImage.value = null
        setSelectedImage(null)

    }

    useEffect(() => {
        if (!selectedImage) {
            setImagePreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedImage)
        setImagePreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)

    }, [selectedImage])


    // For Update Property


    const fillFormRefData = (propertyData) => {
        const {
            propertyTitle,
            propertyDescription,
            propertyArea,
            propertyOption,
            propertyType,
            builtYear,
            street,
            city,
            state,
            zipCode,
            hasBasement,
            hasParking,
            numberOfbed,
            numberOfbaths,
            propertyPrice,
        } = formRef.current;

        propertyTitle.value = propertyData.title
        propertyDescription.value = propertyData.propertyDetail.description
        propertyArea.value = propertyData.propertyDetail.area
        propertyOption.value = propertyData.propertyOption
        propertyType.value = propertyData.propertyType
        builtYear.value = propertyData.builtYear
        street.value = propertyData.address.street
        city.value = propertyData.address.city
        state.value = propertyData.address.state
        zipCode.value = propertyData.address.zipcode
        hasBasement.value = propertyData.propertyDetail.hasBasement
        hasParking.value = propertyData.propertyDetail.hasParking
        numberOfbed.value = propertyData.propertyDetail.bed
        numberOfbaths.value = propertyData.propertyDetail.bath
        propertyPrice.value = propertyData.price

        setHasBasement(hasBasement.value)
        setHasParking(hasParking.value)
    }


    useEffect(() => {
        if (propertyId) {
            // console.log(propertyId)
            dispatch(fetchPropertyById(propertyId))
                .then((res) => {
                    fillFormRefData(res.data)
                }).catch((e) => {
                    console.log(e.message)
                })
        }
    }, [propertyId])


    return (
        <>
            <div className='page-header'><p className='title'>{propertyId ? "Update Property" : "Add Property"}</p></div>
            <div className='add-property-container'>
                <Form noValidate validated={validated} ref={formRef} onSubmit={e => handleSubmit(e)}>

                    {/* TITLE */}
                    <div className='row'>
                        <p className='property-add-subtitles'>Property Details</p>
                        <div className='col-sm'>
                            <Form.Group className="mb-4" controlId="formBasicPropertyTitle">
                                <Form.Label>Property Title</Form.Label>
                                <Form.Control
                                    required
                                    as="textarea"
                                    type="text"
                                    rows={1}
                                    placeholder="Property Title"
                                    name="propertyTitle"

                                />
                                <Form.Control.Feedback type="invalid">
                                    Please Provide Property Title
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>
                        <div className='col-sm'>
                            <Form.Group className="mb-4" controlId="formBasicDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    type="text"
                                    rows={1}
                                    placeholder="Description"
                                    name="propertyDescription"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please Provide Property Description
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>
                        <div className='col-sm'>
                            <Form.Group className="mb-4" controlId="formBasicPropertyPrice">
                                <Form.Label>Property Price (In Dollars)</Form.Label>
                                <Form.Control
                                    type="number"
                                    min={1}
                                    placeholder="Price"
                                    name="propertyPrice"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please Provide Property Price
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>
                    </div>

                    {/* Description */}
                    {/* <div className='row'>
                        <Form.Group className="mb-4" controlId="formBasicDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                type="text"
                                placeholder="Description"
                                name="propertyDescription"
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please Provide Property Description
                            </Form.Control.Feedback>
                        </Form.Group>
                    </div> */}


                    <div className='row'>
                        <div className='col-sm'>
                            <Form.Group className="mb-4" controlId="formBasicArea">
                                <Form.Label>Area</Form.Label>
                                <Form.Control
                                    min={1}
                                    type="number"
                                    required
                                    name="propertyArea"
                                    placeholder="Area (in Sq. Feet)" />
                                <Form.Control.Feedback type="invalid">
                                    Please Provide Property Area
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>


                        <div className='col-sm'>
                            <Form.Group className="mb-4" controlId="formBasic">
                                <Form.Label>Property Option</Form.Label>
                                <Form.Select placeholder='Choose Property Option' required name="propertyOption">
                                    <option disabled>Choose Property Option</option>
                                    <option defaultChecked value={"RENTAL"}>Rental</option>
                                    <option value={"SALES"}>Sale</option>
                                    <option value={"MORTGAGE"}>Mortgage</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    Please Provide Property Area
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>

                        <div className='col-sm'>
                            <Form.Group className="mb-4" controlId="formBasicPropertyType">
                                <Form.Label>Property Type</Form.Label>
                                <Form.Select placeholder='Choose Property Type' required name="propertyType">
                                    <option disabled>Choose Property Option</option>
                                    {propertyTypes.map(p => {
                                        return <option value={p}>{p}</option>
                                    })}


                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    Please Provide Property Type
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>
                        <div className='col-sm'>
                            <Form.Group className="mb-4" controlId="formBasicBuiltYear">
                                <Form.Label>Built Year</Form.Label>
                                <Form.Control
                                    name="builtYear"
                                    type="number"
                                    min="1900"
                                    step="1"
                                    placeholder="Built Year"
                                    max={new Date().toISOString().slice(0, 4)}
                                    required
                                    defaultValue={new Date().toISOString().slice(0, 4)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please Provide Built Year
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>
                    </div>

                    {/* Address */}
                    <div className='row'>
                        <p className='property-add-subtitles'>Address</p>
                        <div className='col-sm'>
                            <Form.Group className="mb-4" controlId="formBasicStreet">
                                <Form.Label>Street</Form.Label>
                                <Form.Control type="text" placeholder="Enter Street" required name="street" />
                                <Form.Control.Feedback type="invalid">
                                    Please Provide Street
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>

                        <div className='col-sm'>
                            <Form.Group className="mb-4" controlId="formBasicCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control type="text" placeholder="Enter City" required name="city" />
                                <Form.Control.Feedback type="invalid">
                                    Please Provide City
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>

                        <div className='col-sm'>
                            <Form.Group className="mb-4" controlId="formBasicState">
                                <Form.Label>State</Form.Label>
                                <Form.Select placeholder='Choose State' required name="state">
                                    <option disabled>Choose State</option>
                                    {addressStates.map(state => {
                                        return <option
                                            key={state.abv}
                                            value={state.name}>{state.name}</option>
                                    })}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    Please Provide State
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>

                        <div className='col-sm'>
                            <Form.Group className="mb-4" controlId="formBasicZipCode">
                                <Form.Label>Zip Code</Form.Label>
                                <Form.Control type="text" placeholder="Enter Zip Code" required name="zipCode" />
                                <Form.Control.Feedback type="invalid">
                                    Please Provide Zip Code
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>
                    </div>


                    <div className='row'>
                        <p className='property-add-subtitles'>Amenities</p>

                        <div className='col-sm'>
                            <Form.Group className="mb-4" controlId="formBasicHasBasement">
                                <Form.Label>Basement</Form.Label>
                                <Form.Check
                                    // required
                                    // defaultChecked={false}
                                    name="hasBasement"
                                    type="switch"
                                    id="custom-switch"
                                    checked={hasBasement}
                                    value={hasBasement}
                                    label={hasBasement ? "Yes" : "No"}
                                    onChange={e => setHasBasement(!hasBasement)}
                                />
                            </Form.Group>
                        </div>

                        <div className='col-sm'>
                            <Form.Group className="mb-4" controlId="formBasicHasParking">
                                <Form.Label>Parking</Form.Label>
                                <Form.Check
                                    // required
                                    // defaultChecked={false}
                                    name="hasParking"
                                    type="switch"
                                    id="custom-switch"
                                    value={hasParking}
                                    checked={hasParking}
                                    label={hasParking ? "Yes" : "No"}
                                    onChange={e => setHasParking(!hasParking)}
                                />
                            </Form.Group>
                        </div>

                        <div className='col-sm'>
                            <Form.Group className="mb-4" controlId="formBasicBed">
                                <Form.Label>Bed</Form.Label>
                                <Form.Control
                                    defaultValue={0}
                                    type="number"
                                    placeholder="Enter Number of Beds"
                                    required
                                    min={0}
                                    name="numberOfbed"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please Provide valid number of beds
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>

                        <div className='col-sm'>
                            <Form.Group className="mb-4" controlId="formBasicBath">
                                <Form.Label>Bath</Form.Label>
                                <Form.Control
                                    defaultValue={0}
                                    type="number"
                                    placeholder="Enter Number of Baths"
                                    required
                                    min={0}
                                    name="numberOfbaths"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please Provide valid number of baths
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>
                    </div>

                    {!propertyId && (<div className='row'>
                        <p className='property-add-subtitles'>Image</p>

                        <div className='col-sm'>
                            {selectedImage && <div className='upload-image-container'>
                                <img src={imagePreview} className="upload-image-preview" />
                                {/* <p className='image-name'>{selectedImage.name}</p> */}
                                <div className='remove-image-div'>
                                    <Button
                                        onClick={e => removeSelectedImage()}
                                        variant="outline-danger"
                                        className='image-remove-btn'
                                        title="Remove Image">
                                        <RiDeleteBin5Fill />
                                    </Button>
                                </div>

                            </div>}
                            <Form.Group className="mb-4" controlId="formBasicPropertyImage">
                                <Form.Label>Upload Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    onChange={e => handleImage(e)}
                                    accept="image/png, image/jpeg, image/jpeg"
                                    name="propertyImage"
                                    required />
                                <Form.Control.Feedback type="invalid">
                                    Please Provide Image
                                </Form.Control.Feedback>
                                {imageError && <span className='image-size-warn'>
                                    Image size should be less than 500 KB
                                </span>}
                            </Form.Group>
                        </div>
                    </div>)}


                    <div className='row-button-submit-property'>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </div>



                </Form>
            </div>


        </>

    )
}

export default AddProperty