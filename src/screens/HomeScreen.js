import React, {useState} from "react";
import DashboardDrawer from "../components/DashbordDrawer";
import {Outlet} from "react-router-dom";


export default function HomeScreen({app}) {

    const [activeScreen, setActiveScreen] = useState('my_ideas');

    return (
        <DashboardDrawer setActiveScreen={setActiveScreen}
                         activeScreen={activeScreen}
                         app={app}
                         user={app.currentUser()}>
            <Outlet/>
        </DashboardDrawer>
    )
}