import { useState, useEffect } from "react";
import useApi from "../../hooks/useApi";
import ProfileInfoSkeleton from '../../components/skeletons/ProfileInfoSkeleton'

const ProfileInfo = ({ reload, setReload }) => {
  const { request, loading, error } = useApi();

  const [profile, setProfile] = useState();

  useEffect(() => {
    (async () => {
      const result = await request({
        url: `${import.meta.env.VITE_API}/profile/info`,
      });

      if (result?.success) {
        setProfile(result.data);
        console.log(result.data);
      }
    })();
  }, [reload]);

  const cloudBaseUrl = "https://res.cloudinary.com/dbbg33z9v/image/upload/";

  const imageUrl = profile?.image
    ? cloudBaseUrl + profile.image
    : "https://via.placeholder.com/300x220?text=No+Image";

  if (loading) return <ProfileInfoSkeleton />
  
  return (
    <div className="mt-6">
      {/* Profile image & text */}
      <div className="flex gap-6 items-center sm:items-start text-left">
        <div className="w-[110px] h-[110px] min-w-[110px] min-h-[110px] rounded-full border-4 border-[#FBD144] overflow-hidden flex items-center justify-center">
          <img
            className="w-full h-full object-cover"
            src={imageUrl}
            alt="Profile"
          />
        </div>
        <div className="text-xs sm:text-base text-base/10">
          <h1 className="text-2xl sm:text-3xl font-semibold">
            {profile?.full_name}
          </h1>
          <p className="text-[#555555] dark:text-white text-xs sm:text-base">
            {profile?.role}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-around gap-6 text-center mt-6">
        <p className="flex flex-col items-center">
          <span className="text-xl">{profile?.experience}+</span>
          Years of Experience
        </p>
        <p className="flex flex-col items-center">
          <span className="text-xl">{profile?.satisfied_clients}+</span>
          Satisfied Clients
        </p>
        <p className="flex flex-col items-center">
          <span className="text-xl">{profile?.completed_projects}+</span>
          Completed Projects
        </p>
      </div>
    </div>
  );
};

export default ProfileInfo;
