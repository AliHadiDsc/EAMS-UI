import * as requestFromServer from "./vehiclesCrud"
import { vehiclesSlice, callTypes } from "./vehiclesSlice"
import { toast } from "react-toastify"

const { actions } = vehiclesSlice
// const { roleActions } = getAllrolesSlice

export const fetchVehicles = (queryparm) => async (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }))
  return requestFromServer
    .getAllRequest(queryparm)
    .then((response) => {
      const entities = response.data?.data
      dispatch(actions.vehiclesFetched(entities))
    })
    .catch((error) => {
      error.clientMessage = "Can't find customers"
      dispatch(actions.catchError({ error, callType: callTypes.list }))
    })
}

export const fetchVehicle = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.vehicleFetched({ itemForEdit: undefined }))
  }

  dispatch(actions.startCall({ callType: callTypes.action }))
  return requestFromServer
    .getById({ id: id })
    .then((response) => {
      //console.log("get center by Id response", response)
      const entities = response.data?.data
      dispatch(actions.vehicleFetched({ itemForEdit: entities }))
    })
    .catch((error) => {
      error.clientMessage = "Can't find user"
      dispatch(actions.catchError({ error, callType: callTypes.action }))
    })
}

export const deleteVehicle = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }))
  console.log("delete user id", id)
  return requestFromServer
    .deleteRequest({ id: id })
    .then((response) => {
      //console.log("response from delete user ", response.data.message)
      dispatch(actions.vehicleDeleted({ id: id }))
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

export const createVehicle = (item) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }))
  return requestFromServer
    .createRequest(item)
    .then((res) => {
      console.log("createRequest", res)
      const vehicle = res.data?.data
      dispatch(actions.vehicleCreated({ vehicle }))
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
      error.clientMessage = "Can't create user"
      dispatch(actions.catchError({ error, callType: callTypes.action }))
      toast.error(error.response.data.message, {
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

export const updateVehicle = (user) => (dispatch) => {
  //console.log("updatedUser data", user)
  dispatch(actions.startCall({ callType: callTypes.action }))
  return requestFromServer
    .updateRequest(user)
    .then((response) => {
      const updatedVehicle = response.data?.data
      console.log("userAction Res", updatedVehicle)
      dispatch(actions.vehicleUpdated({ updatedVehicle }))
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
      // error.clientMessage = "Can't update User"
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

export const fetchCenters = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }))
  return requestFromServer.getAllCenters().then((response) => {
    const entities = response.data?.data
    dispatch(actions.CenterFetched(entities))
  })
}

export const fetchCategory = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }))

  return (
    requestFromServer
      .getAllCategories()
      .then((response) => {
        dispatch(actions.vehicleCategoryFetched(response.data?.data))
      })
      // .getAllRoles()
      // .then((response) => {
      //   const entities = response.data?.data
      //   // console.log("User entities: ", entities)
      //   dispatch(actions.RolesFetched(entities))
      //})
      .catch((error) => {
        error.clientMessage = "Can't find roles"
        dispatch(actions.catchError({ error, callType: callTypes.list }))
      })
  )
}
