import {Avatar, Typography} from "@mui/material";
import IconButton from "../buttons/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {useTheme} from "@emotion/react";
import {useNavigate} from "react-router-dom";

export function DataPerson({name, career, email, picture}) {
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate(`/profile`, {state: {email: email}});
  }

  return (
    <div style={{display: 'flex', gap: '15px', alignItems: 'center'}} onClick={goToProfile}>
      <Avatar alt="Remy Sharp" src={picture}/>
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
        <DataPerson picture={owner.picture}
                    name={owner.name}
                    email={owner.email}
                    career={owner.career}/>
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