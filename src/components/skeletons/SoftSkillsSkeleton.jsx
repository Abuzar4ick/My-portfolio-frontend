import Skeleton from "./Skeleton"

const SoftSkillsSkeleton = () => {
  const skeletons = Array.from({ length: 4 })

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 mt-4">
      {skeletons.map((_, index) => (
        <Skeleton key={index} className="h-6 w-3/4" />
      ))}
    </div>
  );
};

export default SoftSkillsSkeleton