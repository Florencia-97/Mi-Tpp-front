import React, {useState} from "react";
import DashboardDrawer from "../components/DashbordDrawer";
import IdeasScreen from "./ideas/IdeasScreen";
import ProjectsScreen from "./projects/ProjectsScreen";
import ProfileScreen from "./ProfileScreen";
import PublicIdeasScreen from "./ideas/PublicIdeasScreen";
import StatsScreen from "./StatsScreen";
import ProjectsAsTeacherScreen from "./ProjectsAsTeacherScreen";


export default function HomeScreen({app}) {

    const [activeScreen, setActiveScreen] = useState('my_ideas');

    //const isStudent = app.currentUser().isStudent();
    const isStudent = true;

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
    }

    return (
        <DashboardDrawer setActiveScreen={setActiveScreen} activeScreen={activeScreen} app={app}
                         isStudent={isStudent}>
            {screenShowing}
        </DashboardDrawer>
    )
}