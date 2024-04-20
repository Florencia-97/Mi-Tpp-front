import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import {Typography} from '@mui/material';
import IconButton from '../buttons/IconButton';

import '../../styles/BaseDialog.css';


export default function BaseIconButtonDialog({children, title, icon, open, setOpen, iconStyle = undefined}) {
  const style = styles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleClickOpen} icon={icon} styles={iconStyle || {}}/>
      <Dialog
        onClose={handleClose}
        style={style.dialogContainer}
        open={open}>
        <div className={"modal-icon-container"}>
          <Typography variant="h5" fontWeight="700" marginBottom="25px">
            {title}
          </Typography>
          {children}
        </div>
      </Dialog>
    </>
  );
}


const styles = () => {
  return {
    dialogContainer: {
      overflowX: 'hidden',
      overflowY: 'scroll',
    }
  }
}