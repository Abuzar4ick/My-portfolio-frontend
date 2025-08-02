import Skeleton from "./Skeleton"

const ProjectSkeleton = () => {
  const skeletons = Array(4).fill(0)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 gap-y-8">
      {skeletons.map((_, index) => (
        <div className="flex flex-wrap justify-center gap-6" key={index}>
          <div
          className="w-[47%] min-w-[280px] h-[290px] bg-gray-200 dark:bg-[#2a2a2a] rounded-[16px] overflow-hidden"
        >
          <Skeleton className="w-full h-[220px]" />
          <div className="p-3">
            <Skeleton className="h-4 mb-2 w-3/4" />
            <Skeleton className="h-5 w-1/2" />
          </div>
        </div>
        </div>
      ))}
    </div>
  )
}

export default ProjectSkeleton