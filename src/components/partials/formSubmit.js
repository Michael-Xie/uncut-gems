import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import axios from 'axios';

import styled from "styled-components"

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

export default function FormSubmit({data, onSubmit, user, buyIn, betName, games}) {
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
      Promise.resolve(axios.post(`http://localhost:8001/api/parlay`, {
        admin: user.id,
        name: betName,
        fee: buyIn,
        status: 'open',
        start_time: startTime.sort((a, b) => {
          return new Date(a * 1000) - new Date(b * 1000)
        })[0]
      }))
      .then(res => {
        const id = res.data[0].id
        bets.map(result => {
          const game_id = result.game_id
          result.bets.forEach(bet => {
            if (bet.selected)
              Promise.resolve(axios.post(`http://localhost:8001/api/parlay/bets`, {
                type:      bet.type,
                parlay_id: id,
                game_id:   game_id
              }))
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
      if (selected.length > 0)
        axios.get(`http://localhost:8001/api/games/get/${game.game_id}`)
          .then(res => {
            res.data.map(game => {
              setStartTime(prev => [...prev, game.timestamp])
            })
          })
          .catch(err => console.log(err))
    })
  }, [data])

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        react-transition-group
      </button>
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
            <div>Hello World</div>
            <button onClick={() => {
              handleSubmit(data) 
              handleClose()
            }}>
              Confirm
            </button>
            <button onClick={() => handleClose()}>Cancel</button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}