import React, { memo } from 'react';
import { Stack, Checkbox } from '@mui/material';
import CustomizedTitle from '../CustomizedComponents/CustomizedTitle';

const RatePlans = ({ ratePlans, setRatePlans }) => {
  const switchCheckboxRatePlan = (indexRatePlan) => {
    const ratePlansTemp = [ ...ratePlans ];
    ratePlansTemp[indexRatePlan].checked =
    !ratePlansTemp[indexRatePlan].checked;
    setRatePlans(ratePlansTemp);
  };

  return (
    <div>
      <CustomizedTitle text='Plans Tarifaires' size={18} level={0} />
      <Stack>
      <table>
        {
          ratePlans.map((ratePlan, i) => (
            <tr className={ ratePlan._id }>
              <td><Checkbox checked={ ratePlan.checked } onChange={() => switchCheckboxRatePlan(i)} /></td>
              <td>{ ratePlan.name }</td>
            </tr>
          ))
        }
      </table>
      </Stack>
    </div>
  );
};

export default memo(RatePlans);