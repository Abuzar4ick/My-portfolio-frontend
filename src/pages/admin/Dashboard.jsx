import { NavLink } from "react-router-dom"
// icons
import { IoSchool } from "react-icons/io5"
import { FaGithub } from "react-icons/fa6"
import { FaProjectDiagram } from "react-icons/fa"
import { MdWork } from "react-icons/md"
import { FaUser } from "react-icons/fa"
import { FaCode } from "react-icons/fa"
import { GiTalk } from "react-icons/gi"

const Dashboard = () => {
  const info = [
    { id: 1, title: 'Education', to: '/admin/education', icon: <IoSchool className="text-4xl text-blue-500" /> },
    { id: 2, title: 'Social Media', to: '/admin/socials', icon: <FaGithub className="text-4xl text-gray-800 dark:text-gray-300" /> },
    { id: 3, title: 'Projects', to: '/admin/projects', icon: <FaProjectDiagram className="text-4xl text-green-500" /> },
    { id: 4, title: 'Experience', to: '/admin/experience', icon: <MdWork className="text-4xl text-purple-500" /> },
    { id: 5, title: 'Profile Info', to: '/admin/profile-info', icon: <FaUser className="text-4xl text-pink-500" /> },
    { id: 6, title: 'Skills', to: '/admin/skills', icon: <FaCode className="text-4xl text-orange-500" /> },
    { id: 7, title: 'Soft Skills', to: '/admin/soft-skills', icon: <GiTalk className="text-4xl text-teal-500" /> }
  ]

  return (
    <section className="min-h-screen p-6 transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center dark:text-white">
        Admin Dashboard 
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {info.map((item) => (
          <NavLink
            key={item.id}
            to={item.to}
            className="bg-white dark:bg-[#1E293B] h-48 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 flex flex-col justify-center items-center text-center cursor-pointer"
          >
            <div className="mb-2">{item.icon}</div>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-100">{item.title}</h2>
          </NavLink>
        ))}
      </div>
    </section>
  )
}

export default Dashboard
