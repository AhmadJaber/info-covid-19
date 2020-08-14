import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const DataSelector = ({
  infectedOn,
  toggleInfectedData,
  recoveredOn,
  toggleRecoveredData,
  deathOn,
  toggleDeathData,
}) => (
  <FormGroup row>
    <FormControlLabel
      control={
        <Checkbox
          checked={infectedOn}
          onChange={toggleInfectedData}
          className='checkedA'
          style={{ color: 'red' }}
        />
      }
      label='Infected'
    />
    <FormControlLabel
      control={
        <Checkbox
          checked={recoveredOn}
          onChange={toggleRecoveredData}
          className='checkedB'
          style={{ color: 'green' }}
        />
      }
      label='Recovered'
    />
    <FormControlLabel
      control={
        <Checkbox
          checked={deathOn}
          onChange={toggleDeathData}
          name='checkedC'
          style={{ color: 'black' }}
        />
      }
      label='Dead'
    />
  </FormGroup>
);

export default DataSelector;
