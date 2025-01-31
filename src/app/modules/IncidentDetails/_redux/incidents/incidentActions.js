import * as requestFromServer from "./incidentCrud"
import { incidentSlice, callTypes } from "./incidentSlice"
import { toast } from "react-toastify"

const { actions } = incidentSlice

export const fetchIncidents = (queryparm) => async (dispatch) => {
  //console.log("Receive QP", queryparm)
  dispatch(actions.startCall({ callType: callTypes.list }))

  return requestFromServer
    .getAllIncidents(queryparm)
    .then((response) => {
      dispatch(actions.incidentsFetched(response))
    })
    .catch((error) => {
      error.clientMessage = "Can't find customers"
      dispatch(actions.catchError({ error, callType: callTypes.list }))
    })
}
export const fetchIncident = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.incidentFetched({ incidentForEdit: undefined }))
  }

  dispatch(actions.startCall({ callType: callTypes.action }))
  return requestFromServer
    .getIncidentById({ id: id })
    .then((response) => {
      //console.log("getIncidentById", response)
      const entities = response.data?.data
      dispatch(actions.incidentFetched({ incidentForEdit: entities }))
    })
    .catch((error) => {
      error.clientMessage = "Can't find Incident"
      dispatch(actions.catchError({ error, callType: callTypes.action }))
    })
}
export const deleteIncident = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }))
  return requestFromServer
    .deleteIncident({ id: id })
    .then((response) => {
      //console.log("response from delete user ", response.data.message)
      dispatch(actions.incidentDeleted({ id: id }))
      toast.success(response.data.message + " Deleted", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    })
    .catch((error) => {
      error.clientMessage = "can't delete user"
      dispatch(actions.catchError({ error, callType: callTypes.action }))
      toast.error("Error 😣")
    })
}
export const createIncident = (incidentForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }))
  return requestFromServer
    .createIncident(incidentForCreation)
    .then((res) => {
      const incident = res.data?.data
      dispatch(actions.incidentCreated(incident))
      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    })
    .catch((error) => {
      error.clientMessage = "Can't create incident"
      dispatch(actions.catchError({ error, callType: callTypes.action }))
      toast.error("Something Went Wrong", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    })
}
export const updateIncident = (incident) => (dispatch) => {
  // console.log("updatedIncident data", incident)
  dispatch(actions.startCall({ callType: callTypes.action }))
  return requestFromServer
    .updateIncident(incident)
    .then((response) => {
      const updatedIncident = response.data?.data
      console.log("IncidentAction Res::", response)
      dispatch(actions.incidentUpdated({ updatedIncident }))
      toast.success(response.data.message + " Updated", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    })
    .catch((error) => {
      // console.log("error User update", error)
      //error.clientMessage = "Can't update User"
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      dispatch(actions.catchError({ error, callType: callTypes.action }))
    })
}
export const fetchIncidentTypes = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }))
  return requestFromServer
    .getAllIncidentTypes()
    .then((response) => {
      const incidentTypes = response.data?.data
      dispatch(actions.IncidentTypesFetched(incidentTypes))
    })
    .catch((error) => {
      error.clientMessage = "Can't find roles"
      dispatch(actions.catchError({ error, callType: callTypes.list }))
    })
}
export const fetchSeverityTypes = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }))
  return requestFromServer.getIncidentSeveritiesType().then((response) => {
    const entities = response.data?.data
    dispatch(actions.incidentSeverityfetched(entities))
  })
}
export const fetchCenters = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }))
  return requestFromServer.getAllCenters().then((response) => {
    const entities = response.data?.data
    dispatch(actions.CentersFetched(entities))
  })
}
export const fetchVehicleById = (queryParams) => (dispatch) => {
  //console.log("queryparams is", queryParams)
  dispatch(actions.startCall({ callType: callTypes.list }))
  return requestFromServer.getVehicleById(queryParams).then((response) => {
    const entities = response.data?.data?.rows
    dispatch(actions.vehicleFetchedByCenterId(entities))
  })
}
export const fetchTripLog = (queryparm) => async (dispatch) => {
  //console.log("Receive QP", queryparm)
  dispatch(actions.startCall({ callType: callTypes.list }))

  return requestFromServer
    .getTripLogByIncidentId(queryparm)
    .then((response) => {
      dispatch(actions.tripLogFetched(response))
    })
    .catch((error) => {
      error.clientMessage = "Can't find customers"
      dispatch(actions.catchError({ error, callType: callTypes.list }))
    })
}
