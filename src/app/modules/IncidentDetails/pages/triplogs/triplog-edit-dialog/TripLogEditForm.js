import React, { useEffect, useState } from "react"
import { Modal } from "react-bootstrap"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import {
  Input,
  Select,
  DatePickerField,
  TextArea,
} from "../../../../../../_metronic/_partials/controls"
import { max } from "date-fns"

// Validation schema
const triplogEditSchema = Yup.object().shape({
  finalReading: Yup.number().required("Meter Reading Required"),
  logBookNo: Yup.number().nullable(),
  price: Yup.number().nullable(),
  status: Yup.mixed()
    .nullable(false)
    .required("Status is required"),
})

// function validateCenterId(value) {
//   let error
//   if (!value) {
//     error = "Required"
//   } else if (value === 0) {
//     error = "Invalid email address"
//   }
//   return error
// }

export function TripLogEditForm({
  updateTripLog,
  driverTrip,
  actionsLoading,
  onHide,
  isUserForRead,
  setCenter,
}) {
  const TripStatus = [
    {
      label: "Open",
    },
    {
      label: "InProgress",
    },
    {
      label: "Close",
    },
  ]
  // const DriverTripLog = { ...driverTrip, status }
  // const getStatus = driverTrip

  //check if null value
  // if (driverTrip.logBookNo === null) {
  //   var newdriverTripLog = { ...driverTrip, logBookNo: "" }
  // }
  console.log("incident for edit", driverTrip)
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={driverTrip}
        validationSchema={triplogEditSchema}
        onSubmit={(values) => {
          updateTripLog(values)
        }}
      >
        {({ errors, touched, isValidating, handleSubmit, handleChange }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              <Form className="form form-label-right">
                <fieldset disabled={isUserForRead}>
                  <div className="form-group row">
                    <div className="col-lg-4">
                      <Field
                        name="finalReading"
                        component={Input}
                        label="Final Reading"
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        name="logBookNo"
                        component={Input}
                        label="Log Book No"
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field name="price" component={Input} label="Price" />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-4">
                      <Select name="status" label="Status">
                        {TripStatus ? (
                          TripStatus.map((response) => {
                            return (
                              <option
                                key={response.label}
                                value={response.label}
                              >
                                {response.label}
                              </option>
                            )
                          })
                        ) : (
                          <></>
                        )}
                      </Select>
                    </div>
                    {/* <div className="col-lg-4">
                      <Select
                        name="incidentSeverityId"
                        label="Incident Severity"
                      >
                        {incidentSeverity ? (
                          incidentSeverity.map((response) => {
                            return (
                              <option
                                key={response.value}
                                value={response.value}
                              >
                                {response.label}
                              </option>
                            )
                          })
                        ) : (
                          <></>
                        )}
                      </Select>
                    </div> */}
                  </div>
                </fieldset>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              {/* <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate"
              >
                Save
              </button> */}
              {!isUserForRead ? (
                <>
                  <button
                    type="button"
                    onClick={() => handleSubmit()}
                    className="btn btn-primary btn-elevate"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={onHide}
                    className="btn btn-light btn-elevate"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={onHide}
                  className="btn btn-primary btn-elevate"
                >
                  Ok
                </button>
              )}

              <> </>
              {/* {!isUserForRead && (
                <button
                  type="submit"
                  onClick={() => handleSubmit()}
                  className="btn btn-primary btn-elevate"
                >
                  Save
                </button>
              )} */}
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  )
}
