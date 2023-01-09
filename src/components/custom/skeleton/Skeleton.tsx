import { Skeleton as MuiSkeleton, SkeletonProps, styled } from '@mui/material';

const Skeleton = styled((props: SkeletonProps) => {
  return <MuiSkeleton {...props} />;
})({
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '5px',
});

export default Skeleton;
