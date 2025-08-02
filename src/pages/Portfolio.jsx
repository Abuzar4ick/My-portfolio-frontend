import { NavLink } from "react-router-dom";
import useApi from "../hooks/useApi";
import { useState, useEffect } from "react";
import ProjectSkeleton from "../components/skeletons/ProjectListSkeleton";

const Portfolio = () => {
  const { request, loading, error } = useApi();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await request({
        url: `${import.meta.env.VITE_API}/projects`,
      });

      if (result?.success) {
        setProjects(result.data);
      }
    })();
  }, []);

  if (loading)
    return (
      <>
        <ProjectSkeleton />
        <ProjectSkeleton />
      </>
    );

  const cloudBaseUrl = `${import.meta.env.VITE_CLOUDINARY_URL}`
  return (
    <section className="px-4 sm:px-6 lg:px-8">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {!loading &&
          projects.map((project) => {
            const imageUrl = project.image
              ? cloudBaseUrl + project.image
              : "https://via.placeholder.com/300x220?text=No+Image";
            return (
              <div
                key={project._id}
                className="w-full max-w-[304px] h-[290px] mx-auto transform transition duration-300 hover:-translate-y-1 active:translate-y-[2px]"
              >
                <NavLink to={`/projects/${project._id}/detail`}>
                  <img
                    src={imageUrl}
                    alt={project.title}
                    className="rounded-[16px] cursor-pointer w-full h-[220px] object-cover"
                  />
                </NavLink>
                <div className="pt-2 text-base/7">
                  <p className="text-[#555555] text-[13px] dark:text-[#E9EBEC]">
                    {project.description}
                  </p>
                  <h2 className="font-medium text-[18px]">{project.title}</h2>
                </div>
              </div>
            );
          })}
      </div>

      {/* <div className="w-full flex justify-center mt-10">
        <button className="bg-[#FBD144] dark:bg-[#FFE071] hover:bg-[#e5bc29] active:bg-[#cfae1e] w-[132px] h-[56px] rounded-[8px] cursor-pointer dark:text-[#171F26] font-medium">
          Load More
        </button>
      </div> */}
    </section>
  );
};

export default Portfolio;
