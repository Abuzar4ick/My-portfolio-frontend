import { useState } from "react"
// pages
import Portfolio from "../pages/Portfolio"
import About from "../pages/About"

const SectionToggle = () => {
  const [activeTab, setActiveTab] = useState("portfolio")

  return (
    <div>
      <div className="flex justify-between items-center w-full bg-white dark:bg-[#171F26] h-[76px] gap-[12px] rounded-[16px] p-[12px] shadow-sm">
        <button
          onClick={() => setActiveTab("portfolio")}
          className={`w-[50%] h-[52px] rounded-[10px] font-medium transition-all duration-300
            ${
              activeTab === "portfolio"
                ? "bg-[#E9EBEC] text-[#171F26] dark:bg-[#0C151D] dark:text-[#FFE071]"
                : "bg-transparent text-[#555555] dark:text-white hover:bg-[#F3F3F3] active:bg-[#E0E0E0] dark:hover:bg-[#232b31dd] dark:active:bg-[#1d2429]"
            }`}
        >
          Portfolio
        </button>
        <button
          onClick={() => setActiveTab("about")}
          className={`w-[50%] h-[52px] rounded-[10px] font-medium transition-all duration-300
            ${
              activeTab === "about"
                ? "bg-[#E9EBEC] text-[#171F26] dark:bg-[#0C151D] dark:text-[#FFE071]"
                : "bg-transparent text-[#555555] dark:text-white hover:bg-[#F3F3F3] active:bg-[#E0E0E0] dark:hover:bg-[#232b31dd] dark:active:bg-[#1d2429]"
            }`}
        >
          About
        </button>
      </div>

      <div className="mt-6">
        <div hidden={activeTab !== "portfolio"}>
          <Portfolio />
        </div>
        <div hidden={activeTab !== "about"}>
          <About />
        </div>
      </div>
    </div>
  )
}

export default SectionToggle