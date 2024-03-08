import {TextField, Typography} from "@mui/material";
import {useTheme} from "@emotion/react";
import {observer} from "mobx-react";
import GeneralIdeaItemList from "../../components/GeneralIdeaItemList";
import SearchIcon from '@mui/icons-material/Search';
import IconButton from "../../components/buttons/IconButton";
import {useEffect, useState} from "react";


function PublicIdeasScreen({app}) {
    const theme = useTheme();
    const [searchText, setSearchText] = useState('');
    const [ideas, setIdeas] = useState([]);
    const style = styles(theme);

    useEffect(() => {
        getIdeas();
    }, []);

    const getIdeas = async () => {
        const response = await app.apiClient().getPublicIdeas();
        setIdeas(response.ideas());
    }

    const onSearchTextChanged = async (event) => {
        setSearchText(event.target.value);
        const response = await app.apiClient().getPublicIdeas(searchText);
        setIdeas(response.ideas());
        setIdeas(ideas.filter(idea => idea.name.toLowerCase().includes(searchText.toLowerCase())));
    }

    const renderedIdeas = ideas.map(idea => {
        if (idea.type !== 'draft')  {
            return <GeneralIdeaItemList idea={idea} app={app}/>
        }
    });

    return (
        <>
            <div style={style.ideasBarContainer}>
                <Typography variant="h5" style={{flex:1}}>
                    Ideas
                </Typography>
                <div style={{flex:1, display:'flex', flexDirection: 'row'}}>
                    <TextField label="Buscar idea" onChange={onSearchTextChanged} fullWidth/>
                    <IconButton icon={<SearchIcon sx={{ color:'#ffgfff'}}/>}/>
                </div>
            </div>
            <div style={style.ideasContainer}>
                {renderedIdeas}
            </div>
        </>
    );
}

const styles = (theme) => {
    return {
        ideasBarContainer: {
            backgroundColor: theme.palette.background.white,
            width: '100%',
            padding: '1rem',
            borderRadius: '5px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        ideasContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            gap: '15px'
        }
    }
}

export default observer(PublicIdeasScreen);