import {Typography} from "@mui/material";
import {useTheme} from "@emotion/react";
import BaseIconButtonDialog from "./BaseIconButtonDialog";
import FillButton from "../buttons/FillButton";
import OutlineButton from "../buttons/OutlineButton";
import {useState} from "react";

export default function ValidateActionIconDialog({actionLabel, icon, acceptBtnLabel, onAccept}) {
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
        <BaseIconButtonDialog title={"Cuidado!"} icon={icon}>
            <div style={style.bodyContainer}>
                <Typography>
                    Estás seguro que {actionLabel} ?
                </Typography>
                <div style={style.buttonsContainer}>
                    <FillButton styles={{width: 'fit-content'}} label={acceptBtnLabel} onClick={onAccept}/>
                    <OutlineButton styles={{width: 'fit-content'}} label="Cancelar"/>
                </div>
            </div>
        </BaseIconButtonDialog>
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