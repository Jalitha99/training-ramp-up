import { DateInput, DatePicker } from '@progress/kendo-react-dateinputs';

const DateCell = () => {
    return ( 
        <>
        <DatePicker
          format={{
            skeleton: 'E MMM dd yyyy',
        
          }}
          disabled={false}
        //   defaultValue={defaultValue}
        />
                {/* <DateInput
          format={{
            skeleton: 'yMMMdEHm',
          }}
          value={value}
        //   onChange={changeDate}
        /> */}
        </>
     );
}
 
export default DateCell;