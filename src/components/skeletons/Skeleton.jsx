const Skeleton = ({ className = "" }) => {
  return <div className={`bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md ${className}`} />
}

export default Skeleton