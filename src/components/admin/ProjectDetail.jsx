import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useApi from "../../hooks/useApi";
import ProjectDetailSkeleton from '../../components/skeletons/ProjectDetailSkeleton'
// icons
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";

const ProjectDetail = () => {
  const token = localStorage.getItem("token");

  const { request, loading, error } = useApi();

  const [project, setProject] = useState();

  const params = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const result = await request({
        url: `${import.meta.env.VITE_API}/projects/${params.id}`,
      });

      if (result?.success) {
        setProject(result.data);
      }
    })();
  }, [params.id]);

  const deleteProject = async () => {
    const result = await request({
      url: `${import.meta.env.VITE_API}/projects/${params.id}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (result?.success) {
      navigate("/admin/projects");
    }
  };

  const cloudBaseUrl = `${import.meta.env.VITE_CLOUDINARY_URL}`

  const imageUrl = project?.image
    ? cloudBaseUrl + project.image
    : "https://via.placeholder.com/300x220?text=No+Image";

    if (loading) return <ProjectDetailSkeleton />;
  return (
    <div className="flex flex-col items-center gap-y-10 px-4 sm:px-8">
      {/* Back button (top) */}
      <button
        onClick={() => navigate(-1)}
        className="w-[56px] h-[56px] cursor-pointer bg-[#FBD144] hover:bg-[#e5bc29] active:bg-[#cfae1e] flex items-center justify-center rounded-full drop-shadow-xl text-[#171F26]"
      >
        <IoMdArrowRoundBack size={20} />
      </button>

      {/* Title & description */}
      <div className="text-center flex flex-col gap-y-4">
        <h2 className="text-[#171F26] font-bold text-[28px] sm:text-[32px] dark:text-white">
          {project?.title}
        </h2>
        <p className="text-[#555555] dark:text-[#FFE071] text-sm sm:text-base">
          {project?.role}
        </p>
        <p className="text-[#555555] dark:text-[#FFE071] text-sm sm:text-base flex flex-wrap gap-2 justify-center">
          {project?.stack.map((tech, index) => (
            <span
              key={index}
              className="bg-[#FBD144] text-[#171F26] dark:bg-[#333] dark:text-white px-2 py-1 rounded text-xs sm:text-sm"
            >
              {tech}
            </span>
          ))}
        </p>
      </div>

      {/* Image */}
      <img
        className="w-full max-w-[652px] h-auto rounded-[18px]"
        src={imageUrl}
        alt={project?.title}
      />

      {/* Overview & Challenge */}
      <div className="flex flex-col gap-y-10 max-w-[720px] w-full">
        <div>
          <h3 className="text-[24px] sm:text-[32px] font-bold text-[#222222] dark:text-white mb-2">
            Overview
          </h3>
          <p className="text-[#171F26] dark:text-white text-base leading-relaxed">
            {project?.overview}
          </p>
        </div>

        <div>
          <h3 className="text-[24px] sm:text-[32px] font-bold text-[#222222] dark:text-white mb-2">
            Challenge
          </h3>
          <p className="text-[#171F26] dark:text-white text-base leading-relaxed">
            {project?.challenge}
          </p>
        </div>
      </div>

      {/* Back button (bottom) */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-[#FBD144] hover:bg-[#e5bc29] active:bg-[#cfae1e] w-[132px] h-[56px] rounded-[8px] cursor-pointer dark:text-[#171F26] font-medium flex items-center justify-center gap-2"
        >
          <IoMdArrowRoundBack size={18} />
          Back
        </button>
        <button
          onClick={() => deleteProject()}
          className="w-[132px] h-[56px] bg-red-500 hover:bg-red-600 active:text-red-700 rounded-[8px] cursor-pointer flex items-center justify-center gap-1"
        >
          <FaRegTrashAlt /> Delete
        </button>
      </div>
    </div>
  );
};

export default ProjectDetail;
