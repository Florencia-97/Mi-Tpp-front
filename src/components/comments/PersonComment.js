import {Avatar, Button, Typography} from "@mui/material";
import {deepOrange} from "@mui/material/colors";

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
    const deleteCommentBtn = () => {
        return (
            <Button onClick={() => handleDelete(comment.id)}>
                Eliminar
            </Button>
        );
    }

    const owner = comment.owner;

    return (
        <div style={{display: 'flex', gap: '15px', flexDirection: 'column'}}>
            <DataPerson fontSize={'12px'} size={32} initials={'fr'} name={owner.name} career={owner.career}/>
            <Typography style={{fontSize: '15px'}}>{comment.comment}</Typography>
            {userEmail === owner.email && deleteCommentBtn()}
        </div>
    );
}