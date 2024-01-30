import React, {useState} from "react";
import DashboardDrawer from "../components/DashbordDrawer";
import IdeasScreen from "./ideas/IdeasScreen";
import ProjectsScreen from "./projects/ProjectsScreen";
import ProfileScreen from "./ProfileScreen";
import PublicIdeasScreen from "./ideas/PublicIdeasScreen";


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
    }

    return (
        <DashboardDrawer setActiveScreen={setActiveScreen} activeScreen={activeScreen} app={app}>
            {screenShowing}
        </DashboardDrawer>
    )
}