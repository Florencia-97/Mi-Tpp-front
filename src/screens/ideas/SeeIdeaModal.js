import {FormGroup, TextField, Typography} from "@mui/material";
import {useTheme} from "@emotion/react";
import FillButton from "../../components/buttons/FillButton";
import BaseIconButtonDialog from "../../components/dialogs/BaseIconButtonDialog";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {useEffect, useState} from "react";
import {DataPerson, PersonComment} from "../../components/comments/PersonComment";


export default function SeeIdeaModal({app, idea}) {
    const theme = useTheme();
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [uploadingComment, setUploadingComment] = useState(false);
    const [comments, setComments] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (open) {
            getComments();
        }
    }, [open]);

    const getComments = async () => {
        setLoading(true);
        const response = await app.apiClient().getComments(idea.id);
        setComments(response.comments());
        setLoading(false);
    }

    const style = styles(theme);


    const addCommentToIdea = async () => {
        setUploadingComment(true);
        await app.apiClient().addCommentToIdea(idea.id, comment);
        await getComments();
        setUploadingComment(false);
        setComment("");
    }

    const onCommentDeleted = async (commentId) => {
        setLoading(true);
        await app.apiClient().deleteComment(idea.id, commentId);
        await getComments();
        setLoading(false);
    }

    const renderComments = () => {
        if (loading) {
            return (
                <div>Loading</div>
            );
        }
        return comments.map(comment => {
            return <PersonComment handleDelete={onCommentDeleted}
                                  comment={comment} userEmail={app.currentUser().email()}/>
        })
    }

    return (
        <BaseIconButtonDialog title={idea.title} open={open} setOpen={setOpen}
                              icon={<VisibilityIcon sx={{color: '#ffgfff'}}/>}>
            <FormGroup style={style.newIdeaFormContainer}>
                <DataPerson initials={"DB"} name={idea.owner} career={idea.owner}/>
                {idea.description}
                <Typography variant="h6" fontWeight='700'>
                    Comentarios
                </Typography>
                {renderComments()}
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