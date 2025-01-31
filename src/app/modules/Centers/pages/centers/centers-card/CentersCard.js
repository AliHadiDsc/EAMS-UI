import React, { useMemo } from "react"

import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls"
import { CentersTable } from "../centers-table/CentersTable"
import { useCentersUIContext } from "../CentersUIContext"
import { useSelector, shallowEqual } from "react-redux"
import { CenterFilter } from "../centers-filter/CenterFilter"

export function CentersCard() {
  const centersUIContext = useCentersUIContext()

  const centersUIProps = useMemo(() => {
    return {
      newCenterButtonClick: centersUIContext.newCenterButtonClick,
      openEditCenterDialog: centersUIContext.openEditCenterDialog,
    }
  }, [centersUIContext])

  const { userAccess } = useSelector(
    (state) => ({
      userAccess: state.auth.userAccess.Users,
    }),
    shallowEqual
  )

  const accessUser = userAccess.find(
    (item) => item.componentName === "CreateUser"
  )

  return (
    <>
      <Card>
        <CardHeader title="list">
          <CardHeaderToolbar>
            {accessUser ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={centersUIProps.newCenterButtonClick}
              >
                Add New Center
              </button>
            ) : (
              <></>
            )}
            {/* {userAccess.find((item) => {
              if (
                item.componentName === "CreateUser" ||
                item.isAccess === true
              ) {
                return (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={usersUIProps.newUserButtonClick}
                  >
                    Add New User
                  </button>
                )
              }
            })} */}
          </CardHeaderToolbar>
        </CardHeader>

        <CardBody>
          <CenterFilter />
          <CentersTable />
        </CardBody>
      </Card>
    </>
  )
}
