import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import SearchIcon from '@material-ui/icons/Search';
import TvIcon from '@material-ui/icons/Tv';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const CREATE = "CREATE"
const ACTIVE = "ACTIVE"
const OPEN = "OPEN"
const CLOSED = "CLOSED"
const SEARCH = "SEARCH"
const LOADING = "LOADING"
const JOIN = "JOIN"

const ITEM_HEIGHT = 48;

export default function ParlayMenu({ buffer }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const StyledMenuItem = withStyles(theme => ({
    root: {
      padding: '10px',
      fontWeight: 'bold',
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
      }
    }
  }))(MenuItem)

  return (
    <div>
      <IconButton
        color="primary"
        size="medium"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 6,
            width: 160,
            marginLeft: -10,
            marginTop: 10
          },
        }}
      >

        <StyledMenuItem onClick={() => buffer(CREATE)}>
          Create Parlay &nbsp;&nbsp;&nbsp; <ControlPointIcon />
          </StyledMenuItem>
        <StyledMenuItem onClick={() => buffer(ACTIVE)}>
          Active Parlays &nbsp;&nbsp; <TvIcon />
          </StyledMenuItem>
        <StyledMenuItem onClick={() => buffer(OPEN)}>
          Open Parlays &nbsp;&nbsp;&nbsp;&nbsp; <LockOpenIcon />
          </StyledMenuItem>
        <StyledMenuItem onClick={() => buffer(CLOSED)}>
          Closed Parlays &nbsp; <LockIcon />
          </StyledMenuItem>
        <StyledMenuItem onClick={() => buffer(SEARCH)}>
          Search Parlays &nbsp; <SearchIcon />
          </StyledMenuItem>

      </Menu>
    </div>
  );
}
