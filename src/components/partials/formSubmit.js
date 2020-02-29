import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import axios from 'axios';

//k

import styled from "styled-components"

const Checkout = styled.button`
  max-width: 600px;
  width: 100%;
  height: 50px;
  
  position:fixed;
  bottom: 0;

  border: none;

  color: #fff;
  text-shadow: 0.5px 0.5px #000;
  font-weight: bold;
  font-size: 1.25rem;
  background-color: #4f4;

  &:hover {
    color: #000;
  }
`

const Text = styled.div`
  text-align: center;
  margin-bottom: 10px;
`

const Button = styled.button`
  background-color: #555555; /* Green */
  border: 1px solid #fff;
  color: white;
  padding: 10px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;

  cursor:pointer;
`

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function FormSubmit({data, onSubmit, user, buyIn, betName, games, dispatch}) {
  
  
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [startTime, setStartTime] = useState([])

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (bets) => {
    const timestamp = Date.now()
    const gamesNS = games.filter(game => {
      if (new Date(game.timestamp * 1000) > timestamp)
        return game
    })
    if (gamesNS.length !== games.length) {
      alert("One of the games is in progress! Refresh the page!")
      return;
    } else if (betName === "" || buyIn === null || bets.length === 0) {
      alert("Form must be complete!")
      return;
    } else {
      Promise.resolve(axios.post(`/api/parlays`, {
        admin: user.id,
        name: betName,
        fee: buyIn,
        status: 'open',
        start_time: startTime.sort((a, b) => {
          return new Date(a * 1000) - new Date(b * 1000)
        })[0]
      }, 
      {baseURL: 'https://uncut-gems-api-server.herokuapp.com'}
      ))
      .then(res => {
        const id = res.data[0].id
        bets.map(result => {
          const game_id = result.game_id
          result.bets.forEach(bet => {
            if (bet.selected)
              Promise.resolve(axios.post(`/api/parlays/bets`, {
                type:      bet.type,
                parlay_id: id,
                game_id:   game_id
              },
              {baseURL: 'https://uncut-gems-api-server.herokuapp.com'}))
              .catch(err => console.log(err))
          })
        })
        onSubmit()
      })
      .catch(err => console.log(err))
    }
  }
  // determine the start time based on the bets game_id
  useEffect(() => {
    data.map(game => {
      const selected = game.bets.filter(is => {
        if (is.selected)
          return true
      })
      if (selected.length > 0) {
        games.map(res => {
          if (res.game_id === game.game_id) 
            setStartTime(prev => [...prev, res.timestamp])
        })
      }
    })
  }, [data])

  return (
    <div>
      <Checkout type="button" onClick={handleOpen}>
        Checkout!
      </Checkout>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Text>Are you sure?</Text>
            <Button onClick={() => {
              handleSubmit(data) 
              handleClose()
            }}>
              Confirm
            </Button>
            <Button onClick={() => handleClose()}>Cancel</Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
