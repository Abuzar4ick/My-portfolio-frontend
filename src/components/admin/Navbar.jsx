import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
// icons
import { IoIosSunny } from "react-icons/io"
import { IoMdMoon } from "react-icons/io"
import { RiLogoutBoxLine } from "react-icons/ri"

const Navbar = () => {
  const [theme, setTheme] = useState("light")
  const navigate = useNavigate()

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light"
    setTheme(savedTheme)
    document.documentElement.classList.toggle("dark", savedTheme === "dark")
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/admin/register")
  }

  return (
    <nav className="main-container flex items-center justify-between h-[60px] px-4 bg-white dark:bg-[#171F26]">
      <button
        onClick={toggleTheme}
        className="w-[40px] h-[40px] rounded-full bg-[#FBD144] hover:bg-[#e5bc29] active:bg-[#cfae1e] flex items-center justify-center text-2xl text-[#171F26] cursor-pointer transition"
      >
        {theme === "light" ? <IoIosSunny /> : <IoMdMoon />}
      </button>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 active:text-red-700 transition cursor-pointer p-1 rounded-md dark:text-[#171F26] text-white"
      >
        Logout
        <RiLogoutBoxLine size={20} />
      </button>
    </nav>
  )
}

export default Navbar
