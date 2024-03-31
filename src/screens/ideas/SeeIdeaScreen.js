import {FormGroup, TextField, Typography} from "@mui/material";
import {useTheme} from "@emotion/react";
import FillButton from "../../components/buttons/FillButton";
import {useEffect, useState} from "react";
import {DataPerson, PersonComment} from "../../components/comments/PersonComment";
import {useLocation, useNavigate} from "react-router-dom";
import OutlineButton from "../../components/buttons/OutlineButton";


export default function SeeIdeaScreen({app}) {
    const theme = useTheme();
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [uploadingComment, setUploadingComment] = useState(false);
    const [comments, setComments] = useState([]);
    const location = useLocation();
    const navigation = useNavigate();

    const idea = location.state.idea;

    useEffect(() => {
        getComments();
    }, [location]);

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
      <>
          <FormGroup style={style.newIdeaFormContainer}>
              <Typography variant="h4" fontWeight='700'>
                  {idea.title}
              </Typography>
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
                  <OutlineButton styles={{width: 'fit-content'}}
                                 label="Volver"
                                 onClick={() => {navigation(-1)}}
                  />
              </div>
          </FormGroup>
      </>
    );
}

const styles = (theme) => {
    return {
        newIdeaFormContainer: {
            display: 'flex',
            flexDirection: 'column',
            gap: '25px',
            width: '100%',
            backgroundColor: theme.palette.background.white,
            padding: '2rem',
        },
        buttonsContainer: {
            display: 'flex',
            flexDirection: 'row',
            gap: '15px',
        }
    }
}