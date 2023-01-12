import {
  Grid,
  GridCellProps,
  GridColumn as Column,
  GridColumn,
  GridToolbar,
} from '@progress/kendo-react-grid'
import products from '../../products.json'
import { Calendar } from '@progress/kendo-react-dateinputs'
import '@progress/kendo-theme-default/dist/all.css'
import { Button } from '@progress/kendo-react-buttons'
import { MyCommandCell } from './MyCommandcell'
import React from 'react'
import { User } from '../../interfaces/interfaces'
import { getItems } from '../../services/services'

const DataGrid = () => {
  const [data, setData] = React.useState<User[]>([])

  // React.useEffect(() => {
  //   let newItems = getItems()
  //   setData(newItems)
  // }, [])

  // const addNew = () => {
  //   const newDataItem = { inEdit: true, Discontinued: false }

  //   setData([newDataItem, ...data])
  // }

  const CommandCell = (props: GridCellProps) => (
    <MyCommandCell
      {...props}
      edit={''}
      remove={''}
      add={['']}
      discard={''}
      update={''}
      cancel={''}
      editField={''}
    />
  )
  return (
    <Grid
      editField='inEdit'
      style={{
        height: '400px',
        margin: '100px',
      }}
      data={products}
    >
      <GridToolbar>
        <button
          style={{padding:'3px 8px 6px 8px', margin:'10px'}}
          title='Add new'
          className='k-button k-button-md k-rounded-md k-button-solid k-button-solid-secondary'
          // onClick={addNew}
        >
          Add new
        </button>
      </GridToolbar>
      <GridColumn field='userId' title='ID' width='150px' />
      <GridColumn field='username' title='Name' width='150px' />
      <GridColumn field='gender' title='Gender' width='150px' />
      <GridColumn field='address' title='address' width='150px' />
      <GridColumn field='mobile' title='mobile' width='150px' />
      <GridColumn field='dob' title='dob' width='150px' />
      <GridColumn field='age' title='age' width='150px' />
      <GridColumn title='command' cell={CommandCell} width='200px' />
    </Grid>
  )
}
export default DataGrid
