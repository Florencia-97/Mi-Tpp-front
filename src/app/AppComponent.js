import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import React from "react";
import NotfoundScreen from '../screens/NotFoundScreen';
import GlobalStyles from '../components/GlobalStyles';
import HomeScreen from '../screens/HomeScreen';
import LoginStudentScreen from "../screens/login/LoginStudentScreen";
import {observer} from "mobx-react";
import TeacherWaitingForApprovalScreen from "../screens/TeacherWaitingForApprovalScreen";
import PublicProjectsScreen from "../screens/PublicProjectsScreen";


function AppComponent({app}) {

    const theme = createTheme({
        palette: {
            primary: {
                main: '#54428E',
            },
            background: {
                default: '#f5f8fa',
                white: '#ffffff'
            },
            text:{
              black: "#353535"
            }
        },
    });

    const _isLoggedIn = () => {
        return app.session.isLoggedIn();
    }

    const _canOperate = () => {
        return app.currentUser().canOperate();
    }

    const renderRoutes = () => {
        if (!_isLoggedIn()) {
            return (
                <BrowserRouter>
                    <Routes>
                        <Route path="/projects" element={<PublicProjectsScreen app={app}/>}/>
                        <Route path="/*" element={<LoginStudentScreen app={app}/>}/>
                    </Routes>
                </BrowserRouter>
            );
        }
        if (!_canOperate()) {
            return (
                <BrowserRouter>
                    <Routes>
                        <Route path="/projects" element={<PublicProjectsScreen app={app}/>}/>
                        <Route path="/*" element={<TeacherWaitingForApprovalScreen app={app}/>}/>
                    </Routes>
                </BrowserRouter>
            );
        }
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/home" element={<HomeScreen app={app}/>}/>
                    <Route path="/404" element={<NotfoundScreen/>}/>
                    <Route path="/projects" element={<PublicProjectsScreen app={app}/>}/>
                    <Route path="*" element={<Navigate to="/404"/>}/>
                </Routes>
            </BrowserRouter>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles/>
            {renderRoutes()}
        </ThemeProvider>
    );
}

export default observer(AppComponent);

