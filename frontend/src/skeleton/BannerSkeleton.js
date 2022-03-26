import React from 'react';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


function BannerSkeleton() {
  return <Skeleton variant="rect" height={442} />;
}

export default BannerSkeleton;
