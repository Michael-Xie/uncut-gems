import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import axios from 'axios';

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

export default function TransitionsModal({data, onSubmit, user, buyIn, betName}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (bets) => {
    Promise.resolve(axios.post(`http://localhost:8001/api/parlay`, {
      admin: user.id,
      name: betName,
      fee: buyIn,
      status: 'open'
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
      return id
    })
    .catch(err => console.log(err))
  }

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
              onSubmit()
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
