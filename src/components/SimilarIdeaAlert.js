import IconButton from "./buttons/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {useTheme} from "@emotion/react";
import {useNavigate} from "react-router-dom";

export default function SimilarIdeaAlert({idea}) {
  const theme = useTheme();
  const navigator = useNavigate();
  const style = styles(theme);

  if (!idea.similarIdea || !idea.similarIdea.title) {
    return <></>;
  }

  return (
    <div style={style.similarIdeaWarning}>
      <IconButton icon={<VisibilityIcon/>}
                  style={{color: '#ffc037'}}
                  onClick={() => navigator('/see_idea', {state: {idea: idea.similarIdea}})}/>
      Existe una una idea similar

    </div>
  )
}

const styles = (theme) => {
  return {
    similarIdeaWarning: {
      padding: '0.5rem 0.8rem',
      borderRadius: '5px',
      borderStyle: 'solid',
      borderWidth: '1px',
      borderColor: '#ffc037',
      fontSize: '12px',
    }
  }
}