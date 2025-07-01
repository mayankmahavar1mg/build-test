import React from "react"
import { Outlet } from "@tata1mg/router"
import SideNavbar from "../../components/SideNavbar/SideNavbar"
import css from "./App.scss"

const App = () => {
    return (
        <div className={css.app}>
            <SideNavbar />
            <main className={css.main}>
                <Outlet />
            </main>
        </div>
    )
}

App.serverSideFunction = () => {
    return new Promise((resolve) => resolve())
}

export default App
