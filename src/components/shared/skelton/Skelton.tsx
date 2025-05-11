import Skeleton from "react-loading-skeleton";

export const SkeletonRow = () => (
  <Skeleton
    count={1}
    height={30}
    baseColor="#b3cccc"
    highlightColor="#ffffff"
  />
);
