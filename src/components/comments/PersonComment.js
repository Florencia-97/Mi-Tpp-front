import {Avatar, Typography} from "@mui/material";
import {deepOrange} from "@mui/material/colors";
import IconButton from "../buttons/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {useTheme} from "@emotion/react";

export function DataPerson({initials, name, career, size = 48, fontSize = '18px'}) {
  return (
    <div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
      <Avatar sx={{bgcolor: deepOrange[500], width: size, height: size, fontSize: fontSize}}>
        {initials}
      </Avatar>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <Typography style={{fontSize: '15px'}}>{name}</Typography>
        <Typography style={{fontSize: '12px'}}>{career}</Typography>
      </div>
    </div>
  );
}

export function PersonComment({comment, userEmail, handleDelete}) {

  const theme = useTheme();
  const style = styles(theme);

  const deleteCommentBtn = () => {
    return (
      <IconButton icon={<DeleteIcon sx={{color: '#ffgfff'}}/>} onClick={() => handleDelete(comment.id)}/>
    );
  }

  const owner = comment.owner;

  return (
    <div style={style.mainContainer}>
      <div style={style.leftContainer}>
        <DataPerson fontSize={'12px'} size={32} initials={'fr'} name={owner.name} career={owner.career}/>
        <Typography style={{fontSize: '15px'}}>{comment.comment}</Typography>
      </div>
      {userEmail === owner.email && deleteCommentBtn()}
    </div>
  );
}

const styles = (theme) => {
  return {
    mainContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: '10px'
    },
    leftContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    }
  }
}