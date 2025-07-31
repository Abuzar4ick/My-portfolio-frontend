import Skeleton from "./Skeleton";

const ProfileInfoSkeleton = () => {
  return (
    <div className="mt-6 animate-pulse">
      {/* Profile image & text */}
      <div className="flex gap-6 items-center sm:items-start text-left">
        <Skeleton className="w-[110px] h-[110px] rounded-full" />
        <div className="flex flex-col gap-2">
          <Skeleton className="w-40 h-6 rounded" />
          <Skeleton className="w-32 h-4 rounded" />
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-around gap-6 text-center mt-6">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <Skeleton className="w-10 h-6 rounded" />
            <Skeleton className="w-24 h-4 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileInfoSkeleton;
