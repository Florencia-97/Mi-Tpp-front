import {FormGroup, TextField, Typography} from "@mui/material";
import {useTheme} from "@emotion/react";
import FillButton from "../../components/buttons/FillButton";
import BaseIconButtonDialog from "../../components/dialogs/BaseIconButtonDialog";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {useEffect, useState} from "react";
import {DataPerson, PersonComment} from "../../components/comments/PersonComment";


export default function SeeIdeaModal({app, ideaId}) {
    const theme = useTheme();
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [uploadingComment, setUploadingComment] = useState(false);
    const [idea, setIdea] = useState(undefined);

    const [open, setOpen] = useState(false);

    const style = styles(theme);

    useEffect(() => {
        getIdea();
    }, []);

    const getIdea = async () => {
        setLoading(true);
        const response = await app.apiClient().getIdea(ideaId);
        setIdea(response.idea());
        setLoading(false);
    }

    const addCommentToIdea = async () => {
        setUploadingComment(true);
        await app.apiClient().addCommentToIdea(idea.id, comment);
        await getIdea();
        setUploadingComment(false);
        setComment("");
    }

    if (loading) {
        return (
            <div>Loading</div>
        );
    }

    return (
        <BaseIconButtonDialog title={idea.title} open={open} setOpen={setOpen} icon={<VisibilityIcon sx={{color: '#ffgfff'}}/>}>
            <FormGroup style={style.newIdeaFormContainer}>
                <DataPerson initials={"DB"} name={idea.owner.name} career={idea.owner.career}/>
                {idea.description}
                <Typography variant="h6" fontWeight='700'>
                    Comentarios
                </Typography>
                {idea.comments.map(comment => {
                    return <PersonComment initials={"DB"} name={comment.owner.name} career={comment.owner.career}
                                          comment={comment.comment}/>
                })}
                <div style={{width: '100%'}}>
                    <TextField fullWidth label={"Comentario"} multiline rows={2} id={"comment"}
                               value={comment}
                               onChange={(a) => setComment(a.target.value)}/>
                </div>
                <div style={style.buttonsContainer}>
                    <FillButton styles={{width: 'fit-content'}} label="Comentar" onClick={addCommentToIdea}
                                disabled={uploadingComment}/>
                </div>
            </FormGroup>
        </BaseIconButtonDialog>
    );
}

const styles = (theme) => {
    return {
        newIdeaFormContainer: {
            display: 'flex',
            flexDirection: 'column',
            gap: '25px',
            width: '100%'
        },
        buttonsContainer: {
            display: 'flex',
            flexDirection: 'row',
            gap: '15px',
        }
    }
}