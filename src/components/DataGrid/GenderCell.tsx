import {
  DropDownList,
  DropDownListChangeEvent,
} from '@progress/kendo-react-dropdowns';
import { GridCellProps } from '@progress/kendo-react-grid';

export const GenderCell = (props: GridCellProps) => {

    const localizedData = [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' },
      ];
    
  const handleChange = (e: DropDownListChangeEvent) => {
    if (props.onChange) {
      props.onChange({
        dataIndex: 0,
        dataItem: props.dataItem,
        field: props.field,
        syntheticEvent: e.syntheticEvent,
        value: e.target.value.value,
      });
      console.log('line 23 ',e.target.value.value);
    }
  };

  const { dataItem } = props;
  const field = props.field || '';
  const dataValue = dataItem[field] === null ? '' : dataItem[field];

  console.log('line 31 find :',localizedData.find((item) => item.value === dataValue))
  return (
    <td>
      {dataItem.inEdit ? (
        <DropDownList
          style={{ width: '100px' }}
          onChange={handleChange}
          value={localizedData.find((item) => item.value === dataValue)}
          data={localizedData}
          defaultValue={localizedData[0]}
          textField="text"
        />
      ) : (
        dataValue ? dataValue.toString() : 'male'
      )}
    </td>
  );
};