import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import FillButton from '../buttons/FillButton';
import { useTheme } from '@emotion/react';
import { Typography } from '@mui/material';


export default function BaseTextButtonDialog({children, title, buttonLabel}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const style = styles(theme);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <>
      <FillButton label={buttonLabel} onClick={handleClickOpen}/>
      <Dialog 
        onClose={handleClose} 
        open={open}>
        <div style={style.modalContainer}>
            <Typography variant="h5" fontWeight="700" marginBottom="25px">
                {title}
            </Typography>
            {children}
        </div>
      </Dialog>
    </>
  );
}


const styles = (theme) => {
    return {
        modalContainer: {
            backgroundColor: theme.palette.background.white,
            padding: '3rem',
            borderRadius: '5px',
            display: 'flex',
            flexDirection: 'column',
            minWidth: '450px',
            minHeight: '300px',
        }
    }
}