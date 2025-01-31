import React, { useEffect, useMemo } from "react"
import { Modal } from "react-bootstrap"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls"
import * as actions from "../../../_redux/roles/rolesAction"
import { useRolesUIContext } from "../RolesUIContext"

export function RoleDeleteDialog({ id, show, onHide }) {

  // Role UI Context
  const rolesUIContext = useRolesUIContext()
  const rolesUIProps = useMemo(() => {
    return {
      setIds: rolesUIContext.setIds,
      queryParams: rolesUIContext.queryParams,
    }
  }, [rolesUIContext])

  // Roles Redux state
  const dispatch = useDispatch()
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.roles }),
    shallowEqual
  )

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch])

  const deleteRole = () => {
    // server request for deleting role by id
        dispatch(actions.deleteRole(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchRoles(rolesUIProps.queryParams))
      // clear selections list
      rolesUIProps.setIds([])
      // closing delete modal
      onHide()
    })
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {/*begin::Loading*/}
      {isLoading && <ModalProgressBar />}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">Role Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this role?</span>
        )}
        {isLoading && <span>Role is deleting...</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            className="btn btn-primary btn-elevate"
            onClick={deleteRole}
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}
