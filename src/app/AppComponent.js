import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import React from "react";
import GlobalStyles from '../components/GlobalStyles';
import HomeScreen from '../screens/HomeScreen';
import AccessScreen from "../screens/login/AccessScreen";
import {observer} from "mobx-react";
import TeacherWaitingForApprovalScreen from "../screens/TeacherWaitingForApprovalScreen";
import PublicProjectsScreen from "../screens/public/PublicProjectsScreen";
import IdeasScreen from "../screens/ideas/IdeasScreen";
import ProjectsScreen from "../screens/projects/ProjectsScreen";
import MyProfileScreen from "../screens/MyProfileScreen";
import PublicIdeasScreen from "../screens/ideas/PublicIdeasScreen";
import StatsScreen from "../screens/StatsScreen";
import TeacherListScreen from "../screens/admin/TeacherListScreen";
import AdminListScreen from "../screens/admin/AdminListScreen";
import ProjectsAsRoleScreen from "../screens/ProjectsAsTeacherScreen";
import SeeIdeaScreen from "../screens/ideas/SeeIdeaScreen";

// Toasts
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ProfileScreen from "../screens/ProfileScreen";
import SeePublicProjectScreen from "../screens/public/SeePublicProjectScreen";



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
      text: {
        black: "#353535"
      },
      green: {
        main: '#8dd391',
        contrastText: '#ffffff'
      },
      grey: {
        main: '#a1a1a1',
        contrastText: '#ffffff'
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
            <Route path="/see-public-project/:id" element={<SeePublicProjectScreen app={app}/>}/>
            <Route path="/login/professor" element={<AccessScreen key={'login-professor'}
                                                                  role={'TEACHER'} app={app}/>}/>
            <Route path="/login/admin" element={<AccessScreen key={'login-admin'} role={'ADMIN'} app={app}/>}/>
            <Route path="/*" element={<AccessScreen key={'login'} role={'STUDENT'} app={app}/>}/>
          </Routes>
        </BrowserRouter>
      );
    }
    if (!_canOperate()) {
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/projects" element={<PublicProjectsScreen app={app}/>}/>
            <Route path="/see-public-project/:id" element={<SeePublicProjectScreen app={app}/>}/>
            <Route path="/*" element={<TeacherWaitingForApprovalScreen app={app}/>}/>
          </Routes>
        </BrowserRouter>
      );
    }
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen app={app}/>}>
            <Route path="see_project/:id" element={<ProjectsScreen app={app}/>}/>
            <Route path="/see-public-project/:id" element={<SeePublicProjectScreen app={app}/>}/>
            <Route path="my_ideas" element={<IdeasScreen app={app}/>}/>
            <Route path="my_profile" element={<MyProfileScreen app={app}/>}/>
            <Route path="profile" element={<ProfileScreen app={app}/>}/>
            <Route path="public_ideas" element={<PublicIdeasScreen app={app}/>}/>
            <Route path="see_idea" element={<SeeIdeaScreen app={app}/>}/>
            <Route path="projects_list"
                   element={<ProjectsAsRoleScreen app={app} asSupervisor={false} key={'supervisor'}/>}/>
            <Route path="projects_supervisor_list"
                   element={<ProjectsAsRoleScreen app={app} asSupervisor={true} key={'teacher'}/>}/>
            <Route path="stats" element={<StatsScreen app={app}/>}/>
            <Route path="admins_list" element={<AdminListScreen app={app}/>}/>
            <Route path="teachers_list" element={<TeacherListScreen app={app}/>}/>
          </Route>
          <Route path="/projects" element={<PublicProjectsScreen app={app}/>}/>
          <Route path="*" element={<Navigate to="/404"/>}/>
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles/>
      <ToastContainer/>
      {renderRoutes()}
    </ThemeProvider>
  );
}

export default observer(AppComponent);

