import React from 'react';
import { Stack, Checkbox } from '@mui/material';

const RatePlans = ({ ratePlans, setRatePlans }) => {
  const switchCheckboxRatePlan = (indexRatePlan) => {
    const ratePlansTemp = [ ...ratePlans ];
    ratePlansTemp[indexRatePlan].checked =
    !ratePlansTemp[indexRatePlan].checked;
    setRatePlans(ratePlansTemp);
  };

  return (
    <div>
      <h4>Plans tarifaires</h4>
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

export default RatePlans;