import {Typography} from "@mui/material";
import {useTheme} from "@emotion/react";
import FillButton from "../buttons/FillButton";
import OutlineButton from "../buttons/OutlineButton";
import {useState} from "react";
import BaseTextButtonDialog from "./BaseTextButtonDialog";

export default function ValidateActionTextDialog({actionLabel, buttonLabel, acceptBtnLabel, onAccept, disabled=false}) {
    const theme = useTheme();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const style = styles(theme);
    const _onAccept = () => {
        onAccept();
        setOpen(false);
    }

    if (loading) {
        return (
            <div>loading</div>
        );
    }

    return (
        <BaseTextButtonDialog title={"Cuidado!"} open={open}
                              disabled={disabled}
                              setOpen={setOpen} buttonLabel={buttonLabel}>
            <div style={style.bodyContainer}>
                <Typography>
                    Estás seguro que {actionLabel} ?
                </Typography>
                <div style={style.buttonsContainer}>
                    <FillButton styles={{width: 'fit-content'}} label={acceptBtnLabel} onClick={_onAccept}/>
                    <OutlineButton styles={{width: 'fit-content'}} label="Cancelar" onClick={() => setOpen(false)}/>
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