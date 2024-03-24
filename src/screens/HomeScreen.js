import React, {useState} from "react";
import DashboardDrawer from "../components/DashbordDrawer";
import IdeasScreen from "./ideas/IdeasScreen";
import ProjectsScreen from "./projects/ProjectsScreen";
import ProfileScreen from "./ProfileScreen";
import PublicIdeasScreen from "./ideas/PublicIdeasScreen";
import StatsScreen from "./StatsScreen";
import ProjectsAsTeacherScreen from "./ProjectsAsTeacherScreen";
import AdminListScreen from "./admin/AdminListScreen";
import TeacherListScreen from "./admin/TeacherListScreen";


export default function HomeScreen({app}) {

    const [activeScreen, setActiveScreen] = useState('my_ideas');

    let screenShowing = undefined
    if (activeScreen === "my_ideas") {
        screenShowing = <IdeasScreen app={app}/>
    } else if (activeScreen === "project") {
        screenShowing = <ProjectsScreen app={app}/>
    } else if (activeScreen === "profile") {
        screenShowing = <ProfileScreen app={app}/>
    } else if (activeScreen === "public_ideas") {
        screenShowing = <PublicIdeasScreen app={app}/>
    } else if (activeScreen === "stats") {
        screenShowing = <StatsScreen app={app}/>
    } else if (activeScreen === "projects_list") {
        screenShowing = <ProjectsAsTeacherScreen app={app}/>
    } else if (activeScreen === "admins_list") {
        screenShowing = <AdminListScreen app={app}/>
    } else if (activeScreen === "teachers_list") {
        screenShowing = <TeacherListScreen app={app}/>
    }

    return (
        <DashboardDrawer setActiveScreen={setActiveScreen} activeScreen={activeScreen} app={app}
                         user={app.currentUser()}>
            {screenShowing}
        </DashboardDrawer>
    )
}