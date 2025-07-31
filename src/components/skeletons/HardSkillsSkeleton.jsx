import Skeleton from "./Skeleton"

const HardSkillsSkeleton = () => {
  const skeletons = Array.from({ length: 4 })

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 max-[440px]:grid-cols-2 gap-6 gap-y-6 mt-8">
      {skeletons.map((_, index) => (
        <div key={index} className="grid gap-y-1">
          <Skeleton className="w-[100px] h-[100px] rounded-xl" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-5 w-2/3" />
        </div>
      ))}
    </div>
  )
}

export default HardSkillsSkeleton;
