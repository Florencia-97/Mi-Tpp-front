import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import {useTheme} from '@emotion/react';
import {Typography} from '@mui/material';
import IconButton from '../buttons/IconButton';


export default function BaseIconButtonDialog({children, title, icon, ref=undefined, iconStyle=undefined}) {
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
      <IconButton onClick={handleClickOpen} icon={icon} styles={iconStyle || {}}/>
      <Dialog 
        onClose={handleClose}
        ref={ref}
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
            justifyContent: 'center',
            minWidth: '400px',
            minHeight: '300px',
        }
    }
}