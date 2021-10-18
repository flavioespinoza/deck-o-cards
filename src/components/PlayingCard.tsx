import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

interface PlayingCardProps {
  value: number;
  name: string;
  suite: string;
  color: string;
  hide: boolean;
}

const useStyles = makeStyles((theme) => ({
  card: {
    width: 160,
    height: 240,
    float: 'left',
    marginRight: 5,
    marginBottom: 5,
    borderRadius: 2,
    fontFamily: 'courier',
    cursor: 'pointer',
  },
}));

function PlayingCard(props: PlayingCardProps) {
  const classes = useStyles();
  return (
    <Card className={classes.card + ' ' + (props.hide ? 'stripe' : '')}>
      <CardContent>
        <Typography variant="h3" color={props.color} gutterBottom>
          {props.hide ? '' : props.name}
        </Typography>
        <Typography variant="h1" component="div" color={props.color}>
          {props.hide ? '' : props.suite}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default PlayingCard;
