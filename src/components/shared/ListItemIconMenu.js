import React from 'react';
import ShortId from 'shortid';
import IconMenu from 'material-ui/IconMenu';
import PropTypes from 'prop-types';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import { grey400, white } from 'material-ui/styles/colors';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

function ListItemIconMenu({ actions, isWhite }) {

  const iconButtonElement = (

    <IconButton  tooltip="more">

      <MoreVertIcon color={isWhite ? white : grey400} />

    </IconButton>
  );
  
  return (
    <IconMenu iconButtonElement={iconButtonElement}>
    {
      actions && actions.length > 0 && actions.map(action => (

        <MenuItem key={ShortId.generate()}
                  onClick={action.execute}>
        {
          action.name
        }
        </MenuItem>

      ))
    }
    </IconMenu>
  );
}

ListItemIconMenu.propTypes = {
  actions: PropTypes.array.isRequired,
  isWhite: PropTypes.bool
}

export default ListItemIconMenu;