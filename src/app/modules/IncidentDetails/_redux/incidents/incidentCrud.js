import axios from "axios"

export const USERS_URL = process.env.REACT_APP_API_URL

//Create user
export function createIncident(body) {
  return axios.post(`${USERS_URL}/incidentdetails/create-incident-detail`, body)
}

// Read
export function getAllIncidents(body) {
  return axios.post(
    `${USERS_URL}/incidentdetails/read-all-incident-details`,
    body
  )
}

export function getIncidentById(id) {
  return axios.post(`${USERS_URL}/incidentdetails/read-incident-detail`, id)
}

//Update
export function updateIncident(updatedData) {
  console.log("updated data::", updatedData)
  return axios.put(
    `${USERS_URL}/incidentdetails/update-incident-detail`,
    updatedData
  )
}

//Delete
export function deleteIncident(id) {
  return axios.patch(`${USERS_URL}/incidentdetails/delete-incident-detail`, id)
}

//get All Roles
export function getAllIncidentTypes() {
  return axios.get(`${USERS_URL}/settings/read-all-incident-types-master-data`)
}

//Get Incident
export function getIncidentSeveritiesType() {
  return axios.get(
    `${USERS_URL}/settings/read-all-incident-severities-master-data`
  )
}

//get All Centers
export function getAllCenters() {
  return axios.get(`${USERS_URL}/settings/read-all-centers-master-data`)
}

// get Vehicle By id
export function getVehicleById(body) {
  return axios.post(
    `${USERS_URL}/vehicledetails/read-all-vehicles-by-centerId`,
    body
  )
}

//get TripLog By incident ID

export function getTripLogByIncidentId(body) {
  return axios.post(
    `${USERS_URL}/drivertriplog/read-all-driver-trip-logs-by-incidentId`,
    body
  )
}
