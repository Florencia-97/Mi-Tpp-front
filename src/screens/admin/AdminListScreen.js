import {useTheme} from "@emotion/react";
import {useEffect, useState} from "react";
import {Alert, TextField, Typography} from "@mui/material";
import ValidateActionTextDialog from "../../components/dialogs/ValidateActionTextDialog";
import FillButton from "../../components/buttons/FillButton";


export default function AdminListScreen({app}) {
    const theme = useTheme();
    const [adminUsers, setAdminUsers] = useState([]);
    const [newAdminEmail, setNewAdminEmail] = useState('');
    const [alert, setAlert] = useState({message: '', type: ''});

    useEffect(() => {
        getAdminUsers();
    }, []);

    const style = styles(theme);

    const getAdminUsers = async () => {
        const response = await app.apiClient().getAdminUsers();
        setAdminUsers(response.users());
    }

    const addAdminUser = async () => {
        const response = await app.apiClient().addAdminUser(newAdminEmail);
        if (response.hasError()) {
            showErrorAlert('No se pudo agregar al usuario. Intentar nuevamente más adelante.');
        } else {
            showSuccessAlert("Se ha agregado el usuario correctamente.");
            setNewAdminEmail('');
            getAdminUsers();
        }
    }

    const showSuccessAlert = (message) => {
        setAlert({message: message, type: 'success'});
    }

    const showErrorAlert = (message) => {
        setAlert({message: message, type: 'error'});
    }

    const eliminateUserBtn = (userEmail) => {
        const onConfirm = async () => {
            const response = await app.apiClient().removeAdminUser();
            if (response.hasError()) {
                showErrorAlert('No se pudo eliminar al usuario. Intentar nuevamente más adelante.');
            } else {
                showSuccessAlert("Se ha eliminado el usuario correctamente con mail " + userEmail);
                await getAdminUsers();
            }
        }
        return (
            <ValidateActionTextDialog buttonLabel="Eliminar" actionLabel={"eliminar al usuario " + userEmail}
                                      acceptBtnLabel={"eliminar"} onAccept={onConfirm}/>
        );
    }

    return (
        <>
            <Typography variant="h4" fontWeight='700'>
                Administradores
            </Typography>
            <div style={style.addContainer}>
                <TextField value={newAdminEmail} onChange={(event) => {
                    setNewAdminEmail(event.target.value);
                }}/>
                <FillButton styles={style.buttonContainer} onClick={addAdminUser} label={"Sumar"}/>
            </div>
            {alert.message !== '' ?
                <Alert severity={alert.type} variant="outlined">
                    {alert.message}
                </Alert> :
                <></>
            }
            <section style={style.listContainer}>
                {
                    adminUsers.map((adminUser) => {
                        return (
                            <div key={adminUser.email} style={style.listElementContainer}>
                                <p>{adminUser.email}</p>
                                {eliminateUserBtn(adminUser.email)}
                            </div>
                        );
                    })
                }
            </section>
        </>
    )
}

const styles = (theme) => {
    return {
        listContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '15px',
            width: '100%'
        },
        listElementContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            gap: '15px',
            background: '#e3e3e3',
            padding: '18px',
        },
        addContainer: {
            display: 'flex',
            flexDirection: 'row',
            gap: '15px',
            width: '100%',
            justifyContent: 'flex-start',
            alignItems: 'center'
        },
        buttonContainer: {
            height: '100%',
        }
    }
}