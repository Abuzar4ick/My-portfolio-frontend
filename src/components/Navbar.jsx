import { useEffect, useState } from "react"
// icons
import { IoIosSunny } from "react-icons/io"
import { IoMdMoon } from "react-icons/io"

const Navbar = () => {
  const [theme, setTheme] = useState("light")

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light"
    setTheme(savedTheme)
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  return (
    <nav className="main-container flex items-center justify-end h-[60px] px-4">
      <button onClick={toggleTheme} className="w-[40px] h-[40px] rounded-full bg-[#FBD144] hover:bg-[#e5bc29] active:bg-[#cfae1e] flex items-center justify-center text-2xl text-[#171F26] cursor-pointer">
        {theme === "light" ? <IoIosSunny /> : <IoMdMoon />}
      </button>
    </nav>
  )
}

export default Navbar