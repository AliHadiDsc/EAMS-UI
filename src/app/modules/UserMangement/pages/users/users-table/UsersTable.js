import React, { useEffect, useMemo } from "react"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import * as actions from "../../../_redux/usersActions"
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../.././../_metronic/_helpers"
import * as uiHelpers from "../UsersUIHelpers"
import { ActionsColumnFormatter } from "./column-formatter/ActionsColumnFormatter"
import { Pagination } from "../../../../../../_metronic/_partials/controls"
import { useUsersUIContext } from "../UsersUIContext"

export function UsersTable() {
  //Users UI Context
  const usersUIContext = useUsersUIContext()

  const usersUIProps = useMemo(() => {
    return {
      ids: usersUIContext.ids,
      setIds: usersUIContext.setIds,
      queryParams: usersUIContext.queryParams,
      setQueryParams: usersUIContext.setQueryParams,
      openEditUserDialog: usersUIContext.openEditUserDialog,
      openDeleteUserDialog: usersUIContext.openDeleteUserDialog,
      openReadUserDialog: usersUIContext.openReadUserDialog,
    }
  }, [usersUIContext])

  //console.log("queryparms", usersUIProps.queryparms)
  const { currentState, userAccess } = useSelector(
    (state) => ({
      currentState: state.users,
      userAccess: state.auth.userAccess.Users,
    }),
    shallowEqual
  )
  const { totalCount, entities, listLoading } = currentState
  //console.log("currentState", currentState)
  const dispatch = useDispatch()

  useEffect(() => {
    usersUIProps.setIds([])
    dispatch(actions.fetchUsers(usersUIProps.queryParams))
  }, [usersUIProps.queryParams, dispatch, totalCount])

  const isAccessForEdit = userAccess.find(
    (item) => item.componentName === "UpdateUser"
  )

  const isAccessForDelete = userAccess.find(
    (item) => item.componentName === "DeleteUser"
  )

  // Table columns
  const columns = [
    {
      dataField: "id",
      text: "ID",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "firstName",
      text: "First Name",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "lastName",
      text: "Last Name",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "email",
      text: "Email",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "cnic",
      text: "CNIC",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "phNo",
      text: "Phone",
      sort: false,
      sortCaret: sortCaret,
    },
    {
      dataField: "role.name",
      text: "Role",
      sort: false,
      sortCaret: sortCaret,
    },
    {
      dataField: "center.name",
      text: "Center",
      sort: false,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: "Actions",
      isDummyField: true,
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEditUserDialog: usersUIProps.openEditUserDialog,
        openDeleteUserDialog: usersUIProps.openDeleteUserDialog,
        openReadUserDialog: usersUIProps.openReadUserDialog,
        isAccessForEdit: isAccessForEdit ? isAccessForEdit.isAccess : false,
        isAccessForDelete: isAccessForDelete
          ? isAccessForDelete.isAccess
          : false,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ]

  //console.log("sizePerPageList", usersUIProps.queryparms)
  //console.log("uiHelpers.sizePerPageList", uiHelpers.sizePerPageList)
  //console.log("totalCount", totalCount)
  //Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: usersUIProps.queryParams.pageSize,
    page: usersUIProps.queryParams.pageNumber,
  }
  // const customTotal = (from, to, size) => (
  //   <span className="react-bootstrap-table-pagination-total">
  //     Showing { from } to { to } of { size } Results
  //   </span>
  // );
  // const options = {
  //   paginationSize: 4,
  //   pageStartIndex: 0,
  //   // alwaysShowAllBtns: true, // Always show next and previous button
  //   // withFirstAndLast: false, // Hide the going to First and Last page button
  //   // hideSizePerPage: true, // Hide the sizePerPage dropdown always
  //   // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
  //   firstPageText: 'First',
  //   prePageText: 'Back',
  //   nextPageText: 'Next',
  //   lastPageText: 'Last',
  //   nextPageTitle: 'First page',
  //   prePageTitle: 'Pre page',
  //   firstPageTitle: 'Next page',
  //   lastPageTitle: 'Last page',
  //   showTotal: true,
  //   paginationTotalRenderer: customTotal,
  //   disablePageTitle: true,
  //   sizePerPageList: [{
  //     text: '5', value: 5
  //   }, {
  //     text: '10', value: 10
  //   }, {
  //     text: 'All', value: entities.length
  //   }] // A numeric array is also available. the purpose of above example is custom the text
  // };
  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
              isLoading={listLoading}
              paginationProps={paginationProps}
            >
              <BootstrapTable
                wrapperClasses="table-responsive"
                bordered={false}
                classes="table table-head-custom table-vertical-center overflow-hidden table-hover"
                bootstrap4
                remote
                keyField="id"
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  usersUIProps.setQueryParams
                )}
                // selectRow={getSelectRow({
                //   entities,

                // })}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={entities} />
                <NoRecordsFoundMessage entities={entities} />
              </BootstrapTable>
            </Pagination>
          )
        }}
      </PaginationProvider>
      {/* <BootstrapTable
        wrapperClasses="table-responsive"
        bordered={false}
        classes="table table-head-custom table-vertical-center overflow-hidden"
        bootstrap4
        remote
        keyField="id"
        data={entities === null ? [] : entities}
        columns={columns}
      ></BootstrapTable> */}
    </>
  )
}
