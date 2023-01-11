import { useMapEvent } from 'react-leaflet';

interface VoxelsMapZoomingProps {
  onZoom: (zoom: number) => void;
}

const VoxelsMapZooming = ({ onZoom }: VoxelsMapZoomingProps) => {
  const map = useMapEvent('zoom', () => {
    onZoom(map.getZoom());
  });

  return null;
};

export default VoxelsMapZooming;
