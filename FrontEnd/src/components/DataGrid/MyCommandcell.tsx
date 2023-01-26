import { Button } from '@progress/kendo-react-buttons';
import { User } from '../../interfaces/interfaces'
import * as React from 'react';

export const MyCommandCell = (props: { editField?: any; add?: any; update?: any; discard?: any; cancel?: any; edit?: any; remove?: any; dataItem?: any; }) => {
  const { dataItem } = props;
  const inEdit = dataItem[props.editField];
  const isNewItem = dataItem.id === undefined;
  return inEdit ? (
    <td className="k-command-cell">
      <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-save-command"
        onClick={() =>
          isNewItem ? props.add(dataItem) : props.update(dataItem)
        }
      >
        {isNewItem ? 'Add' : 'Update'}
      </button>
      <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-cancel-command"
        onClick={() =>
          isNewItem ? props.discard(dataItem) : props.cancel(dataItem)
        }
      >
        {isNewItem ? 'Discard' : 'Cancel'}
      </button>
    </td>
  ) : (
    <td className="k-command-cell">
      <Button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary k-grid-edit-command"
        onClick={() => props.edit(dataItem)}
      >
        Edit
      </Button>
      <Button
        
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-remove-command"
        onClick={() =>
          confirm('Confirm deleting: ' + dataItem.ProductName) &&
          props.remove(dataItem)
        }
        >
        Remove
      </Button>
    </td>
  );
};