import React, { useEffect, useMemo, useState } from "react"
import { Modal } from "react-bootstrap"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { TripLogEditForm } from "./TripLogEditForm"
import { IncidentEditDialogHeader } from "./IncidentEditDialogHeader"
import { useTripLogsUIContext } from "../TripLogsUIContext"
import * as actions from "../../../_redux/triplogs/triplogActions"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export function TripLogEditDialog({ id, show, onHide, userForRead }) {
  const [centerId, setCenter] = useState(0)
  const triplogsUIContext = useTripLogsUIContext()
  const triplogsUIProps = useMemo(() => {
    return {
      initTripLog: triplogsUIContext.initTripLog,
      queryParams: triplogsUIContext.queryParams,
    }
  }, [triplogsUIContext])

  const dispatch = useDispatch()
  const { actionsLoading, driverTripForEdit, isuserForRead } = useSelector(
    (state) => ({
      actionsLoading: state.triplogs.actionsLoading,
      driverTripForEdit: state.triplogs.driverTripForEdit,
      // isuserForRead: state.incidentDetails.userForRead,
      // IncidentType: state.incidentDetails.incidentTypes,
      // incidentSeverity: state.incidentDetails.incidentSeverity,
      // centers: state.incidentDetails.centers,
      // vehicleByCenterId: state.incidentDetails.vehicleByCenterId,
      // getState: state,
    }),
    shallowEqual
  )
  //console.log("driverTripForEdit", driverTripForEdit)
  useEffect(() => {
    // dispatch(actions.fetchIncidentTypes())
    // dispatch(actions.fetchSeverityTypes())
    // dispatch(actions.fetchCenters())
    // dispatch(actions.fetchTripLogs(triplogsUIProps.queryParams))
    dispatch(actions.fetchTripLog(id))
    // console.log("centerId", centerId)
    // dispatch(
    //   actions.fetchVehicleById({
    //     ...triplogsUIProps.queryParams,
    //     centerId: centerId,
    //   })
    // )

    // dispatch(actions.fetchVehicleById(parseInt(centerId)))
    // console.log("id is", id)
    if (!id) {
    } else {
      // dispatch(actions.fetchIncident(id))
      // if (incidentForEdit) {
      // }
    }
  }, [id, dispatch, triplogsUIProps, centerId])
  // console.log("incidentForEdit", incidentForEdit)
  // if (incidentForEdit) {
  //   return
  // }
  const updateTripLog = (incident) => {
    if (!id) {
      const incidentUpdate = { ...incident }
      dispatch(actions.createIncident(incident)).then((res) => {
        onHide()
      })
    } else {
      //console.log("i'm in update")
      const {
        isActive,
        slug,
        createdBy,
        updatedBy,
        createdAt,
        updatedAt,
        endDateTime,
        initialReading,
        kiloMeters,
        centerId,
        vehicleId,
        incidentId,
        center,
        vehicle,

        ...rest
      } = incident

      //console.log("...rest::", rest)
      // const userUpdatedFields = {
      //   id: saveIncident.id,
      //   email: saveIncident.email,
      //   phNo: saveIncident.phNo,
      //   cnic: saveIncident.cnic,
      //   password: saveIncident.password,
      //   firstName: saveIncident.firstName,
      //   lastName: saveIncident.lastName,
      //   roleId: saveIncident.roleId,
      // }

      dispatch(actions.updateTrip({ ...rest, id }))
      onHide()
    }
  }

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <IncidentEditDialogHeader id={id} isUserForRead={userForRead} />
      <TripLogEditForm
        updateTripLog={updateTripLog}
        driverTrip={driverTripForEdit || triplogsUIProps.initTripLog}
        onHide={onHide}
        isUserForRead={userForRead}
        setCenter={setCenter}
      />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Modal>
  )
}
