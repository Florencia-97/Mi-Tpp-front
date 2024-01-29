import {Typography} from "@mui/material";
import {useTheme} from "@emotion/react";
import BaseIconButtonDialog from "./BaseIconButtonDialog";
import FillButton from "../buttons/FillButton";
import OutlineButton from "../buttons/OutlineButton";
import {useState} from "react";
import BaseTextButtonDialog from "./BaseTextButtonDialog";

export default function ValidateActionTextDialog({actionLabel, buttonLabel, acceptBtnLabel, onAccept}) {
    const theme = useTheme();
    const style = styles(theme);

    const [loading, setLoading] = useState(false);
    const _onAccept = () => {
        setLoading(true);
        onAccept();
        setLoading(false);
    }

    if (loading) {
        return (
            <div>loading</div>
        );
    }

    return (
        <BaseTextButtonDialog title={"Cuidado!"} buttonLabel={buttonLabel}>
            <div style={style.bodyContainer}>
                <Typography>
                    Estás seguro que {actionLabel} ?
                </Typography>
                <div style={style.buttonsContainer}>
                    <FillButton styles={{width: 'fit-content'}} label={acceptBtnLabel} onClick={onAccept}/>
                    <OutlineButton styles={{width: 'fit-content'}} label="Cancelar"/>
                </div>
            </div>
        </BaseTextButtonDialog>
    );
}

const styles = (theme) => {
    return {
        bodyContainer: {
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
        },
        buttonsContainer: {
            display: 'flex',
            flexDirection: 'row',
            gap: '15px',
        }
    }
}