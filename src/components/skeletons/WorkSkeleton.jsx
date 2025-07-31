import Skeleton from "./Skeleton"

const WorkSkeleton = () => (
  <div className="grid gap-y-4">
    <Skeleton className="h-6 w-1/3" />
    <Skeleton className="h-4 w-1/2" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-5/6" />
  </div>
)

export default WorkSkeleton
