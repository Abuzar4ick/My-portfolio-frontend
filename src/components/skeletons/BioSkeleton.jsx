import Skeleton from "./Skeleton"

const BioSkeleton = () => {
  return (
    <div className="grid gap-y-1">
      <Skeleton className="h-4 w-full max-w-xl mb-4" />
      <Skeleton className="h-4 w-full max-w-xl mb-4" />
      <Skeleton className="h-4 w-full max-w-xl mb-4" />
    </div>
  )
}

export default BioSkeleton