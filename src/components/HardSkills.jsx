import useApi from "../hooks/useApi";
import { useEffect, useState } from "react";
// skeleton
import HardSkillsSkeleton  from './skeletons/HardSkillsSkeleton'

const HardSkills = () => {
  const { request, loading, error } = useApi();
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await request({
        url: `${import.meta.env.VITE_API}/skills`,
      });

      if (result?.success) {
        setSkills(result.data);
      }
    })();
  }, []);

  if (loading) return <HardSkillsSkeleton />

  const cloudBaseUrl = "https://res.cloudinary.com/dbbg33z9v/image/upload/";
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 max-[440px]:grid-cols-2 gap-6 gap-y-6">
      {!loading &&
        !error &&
        skills.map((skill) => {
          const imageUrl = skill.image
            ? cloudBaseUrl + skill.image
            : "https://via.placeholder.com/300x220?text=No+Image";
          return (
            <div key={skill._id} className="grid gap-y-1">
              <div
                style={{ backgroundColor: skill.back_color }}
                className="w-[100px] h-[100px] rounded-xl flex items-center justify-center"
              >
                <img src={imageUrl} alt={skill.title} className="w-[78px]" />
              </div>
              <p className="text-[13px] text-[#555555] dark:text-[#FFE071]">{skill.projects} Projects</p>
              <p className="text-[16px]">{skill.title}</p>
            </div>
          );
        })}
    </div>
  );
};

export default HardSkills;
