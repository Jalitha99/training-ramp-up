import { DatePicker, DatePickerChangeEvent } from '@progress/kendo-react-dateinputs'
import { GridCellProps } from '@progress/kendo-react-grid'

const DatePickerCell = (props: GridCellProps) => {
const max = new Date()
const { dataItem } = props
const field = props.field || ''
const dateValue = dataItem[field] === undefined ? new Date(max) : new Date(dataItem[field])

const handleChange = (e: DatePickerChangeEvent) => {
    if (props.onChange) {
      props.onChange({
        dataIndex: 0,
        dataItem: props.dataItem,
        field: props.field,
        syntheticEvent: e.syntheticEvent,
        value: e.target.value,
      });
    }
  };

return (
    <td>
    {dataItem.inEdit ? (
      <DatePicker
        max={max}
        defaultValue={dateValue}
        onChange={handleChange}
      />) : (
        dateValue != null ? dateValue.toDateString() : ''
      )}
    </td>
  )
}
export default DatePickerCell
