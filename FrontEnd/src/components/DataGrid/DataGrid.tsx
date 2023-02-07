import {
  Grid,
  GridCellProps,
  GridColumn,
  GridToolbar,
  GridItemChangeEvent,
} from '@progress/kendo-react-grid'
import '@progress/kendo-theme-default/dist/all.css'
import { MyCommandCell } from './Commandcell'
import React, { CSSProperties, useEffect } from 'react'
import { HomeState, User } from '../../interfaces/interfaces'
import { validationFunc } from '../../services/services'
import { GenderCell } from './GenderCell'
import { useDispatch, useSelector } from 'react-redux'
import {
  addUserRecord,
  deleteUserRecord,
  getUserRecords,
  updateUserRecord,
} from '../../pages/Home/homeSlice'
import DatePickerCell from './DatePickerCell'
import PuffLoader from 'react-spinners/ClipLoader'

const editField = 'inEdit'

const DataGrid = () => {
  const [data, setData] = React.useState<any[]>([])
  const dispatch = useDispatch()
  const users = useSelector((state: HomeState) => state.home.users)
  const loading = useSelector((state: HomeState) => state.home.isLoading)
  const override: CSSProperties = {
    display: 'block',
    margin: 'auto auto',
    marginTop: '20%',
  };
  

  useEffect(() => {
    dispatch(getUserRecords())
  }, [dispatch])

  useEffect(() => {
    setData(users)
  }, [users])

  const add = (dataItem: User) => {
    if (validationFunc(dataItem)) {
      dispatch(addUserRecord(dataItem))
    }
  }

  const remove = (dataItem: User) => {
    dispatch(deleteUserRecord(dataItem.id))
  }

  const update = (dataItem: User) => {
    if (validationFunc(dataItem)) {
      dispatch(updateUserRecord(dataItem))
      setData(users)
    }
  }
  // Local state operations
  const discard = () => {
    setData(users)
  }
  const cancel = () => {
    setData(users)
  }

  const enterEdit = (dataItem: User) => {
    setData(data.map((item) => (item.id === dataItem.id ? { ...item, inEdit: true } : item)))
  }

  const itemChange = (event: GridItemChangeEvent) => {
    const newData = data.map((item) =>
      item.id === event.dataItem.id ? { ...item, [event.field || '']: event.value } : item,
    )

    setData(newData)
  }

  const addNew = () => {
    const newDataItem = { inEdit: true }

    setData([newDataItem, ...data])
  }

  const CommandCell = (props: GridCellProps) => (
    <MyCommandCell
      {...props}
      edit={enterEdit}
      remove={remove}
      add={add}
      discard={discard}
      update={update}
      cancel={cancel}
      editField={editField}
    />
  )
  return (
    <>
      {loading ? (
        <PuffLoader color='hsla(180, 98%, 32%, 1)' cssOverride={override} size={40} />
      ) : (
        <Grid
          style={{ height: '420px', margin: '100px' }}
          data={data}
          onItemChange={itemChange}
          editField={editField}
        >
          <GridToolbar>
            <button
              style={{ padding: '3px 8px 6px 8px', margin: '10px' }}
              title='Add new'
              className='k-button k-button-md k-rounded-md k-button-solid k-button-solid-secondary'
              onClick={addNew}
            >
              Add new
            </button>
          </GridToolbar>
          <GridColumn editable={false} field='id' title='ID' width='150px' />
          <GridColumn field='name' title='Name' width='150px' />
          <GridColumn field='gender' title='Gender' width='150px' cell={GenderCell} />
          <GridColumn field='address' title='address' width='150px' />
          <GridColumn field='mobile' title='mobile' width='150px' />
          <GridColumn field='dob' format='{0:D}' title='dob' width='200px' cell={DatePickerCell} />
          <GridColumn field='age' title='age' width='150px' editable={false} />
          <GridColumn title='command' cell={CommandCell} width='200px' />
        </Grid>
      )}
    </>
  )
}
export default DataGrid
