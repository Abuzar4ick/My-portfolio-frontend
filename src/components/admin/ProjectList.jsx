import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import useApi from "../../hooks/useApi"
import ProjectSkeleton from '../../components/skeletons/ProjectCardSkeleton'

const ProjectList = ({ reload, setReload }) => {
  const { request, loading, error } = useApi()
  const [projects, setProjects] = useState([])

  useEffect(() => {
    (async () => {
      const result = await request({
        url: `${import.meta.env.VITE_API}/projects`
      })

      if (result?.success) {
        setProjects(result.data)
      }
    })()
  }, [reload])

  const cloudBaseUrl = `${import.meta.env.CLOUDINARY_URL}`

  return (
    <div className=" mt-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center dark:text-white">
        My projects 🗂
      </h1>
      <br />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {loading ? (
          <>
          <ProjectSkeleton />
          <ProjectSkeleton />
          </>
        ) : error ? (
          <p className="text-red-500">{error.message}</p>
        ) : projects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          projects.map((project) => {
            const imageUrl = project.image
              ? cloudBaseUrl + project.image
              : "https://via.placeholder.com/300x220?text=No+Image"

            return (
              <div
                key={project._id}
                className="relative w-full max-w-[304px] h-[290px] mx-auto transform transition duration-300 hover:-translate-y-1 active:translate-y-[2px]"
              >
                <NavLink to={`/admin/projects/${project._id}/detail`}>
                  <img
                    src={imageUrl}
                    alt={project.title}
                    className="rounded-[16px] cursor-pointer w-full h-[220px] object-cover"
                  />
                </NavLink>
                <div className="pt-2 text-base/7">
                  <p className="text-[#555555] dark:text-[#FFE071] text-sm sm:text-base">
                    {project.role}
                  </p>
                  <h2 className="font-medium text-[18px]">{project.title}</h2>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default ProjectList