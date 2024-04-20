import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import FillButton from '../buttons/FillButton';
import {Typography} from '@mui/material';
import OutlineButton from "../buttons/OutlineButton";

import '../../styles/BaseDialog.css';

export default function BaseTextButtonDialog({
                                               children,
                                               title,
                                               buttonLabel,
                                               open,
                                               setOpen,
                                               fillButton = true,
                                               disabled = false
                                             }) {

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {
        fillButton ?
          <FillButton label={buttonLabel} onClick={handleClickOpen} disabled={disabled}/> :
          <OutlineButton label={buttonLabel} onClick={handleClickOpen} disabled={disabled}/>
      }
      <Dialog
        onClose={handleClose}
        open={open}>
        <div className={"modal-text-container"}>
          <Typography variant="h5" fontWeight="700" marginBottom="25px">
            {title}
          </Typography>
          {children}
        </div>
      </Dialog>
    </>
  );
}