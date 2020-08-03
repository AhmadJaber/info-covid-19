import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { ArrowUpward } from '@material-ui/icons';
import { Link as To } from 'react-scroll';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    textTransform: 'capitalize',
    backgroundColor: '#2196F3',
  },
  scrollerContainer: {
    textAlign: 'center',
  },
}));

export default function IconLabelButtons() {
  const classes = useStyles();

  return (
    <div className={classes.scrollerContainer}>
      <To to='countryCharts' smooth={true} offset={-70} duration={500}>
        <Button
          variant='contained'
          color='primary'
          size='large'
          className={classes.button}
          startIcon={<ArrowUpward />}
        >
          SearchField
        </Button>
      </To>
    </div>
  );
}
