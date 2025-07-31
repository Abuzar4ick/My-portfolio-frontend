import { Outlet } from "react-router-dom"
// components
import Navbar from "../components/Navbar"

const RootLayout = () => {
    return (
        <>
            <header className="bg-white dark:bg-[#171F26] w-full">
                <Navbar />
            </header>
            <main className="w-full max-w-[700px] px-4 m-auto py-[80px] flex flex-col gap-10">
                <Outlet />
            </main>
            <footer></footer>
        </>
  )
}

export default RootLayout
