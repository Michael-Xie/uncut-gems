import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import styled from 'styled-components'

const Wrapper = styled.div`
  display:flex;
  justify-content: center;
`

const ShowMore = styled.div`
  font-size: 12px;


`

const Icon = styled.button`
  background-color:transparent;
  border: none;
  color: #DBDBDB;
  transition: color .5s;

  cursor: pointer;

  &:hover {
    color: #000;
  }



`

const ITEM_HEIGHT = 48;

export default function ShowParticipants({ participants }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  
  return (
    <Wrapper>
      <Icon
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <ShowMore>show all {participants.length} participants</ShowMore>
      </Icon>
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
        {

          participants.map((participant) => {
            return (

              <MenuItem>
                {participant.user_name}
              </MenuItem>
            )
          })
        }
      </Menu>
    </Wrapper>
  );
}
