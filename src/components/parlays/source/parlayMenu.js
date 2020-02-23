import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const CREATE = "CREATE"
const ACTIVE = "ACTIVE"
const OPEN = "OPEN"
const CLOSED = "CLOSED"
const SEARCH = "SEARCH"
const LOADING = "LOADING"
const JOIN = "JOIN"

const ITEM_HEIGHT = 48;

export default function ParlayMenu( {buffer} ) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 200,
          },
        }}
      >
    
          <MenuItem onClick={() => buffer(CREATE)}>
            Create
          </MenuItem>
          <MenuItem onClick={() => buffer(ACTIVE)}>
            Active
          </MenuItem>
          <MenuItem onClick={() => buffer(OPEN)}>
            Open
          </MenuItem>
          <MenuItem onClick={() => buffer(CLOSED)}>
            Closed
          </MenuItem>
          <MenuItem onClick={() => buffer(SEARCH)}>
            Search
          </MenuItem>
     
      </Menu>
    </div>
  );
}
