import React from 'react';
import styles from './MapComponent.module.css';

interface MapComponentProps {
  address: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ address }) => {
  // Encode the address for the URL
  const encodedAddress = encodeURIComponent(address);
  
  // Create the OpenStreetMap search URL
  const mapUrl = `https://www.openstreetmap.org/search?query=${encodedAddress}`;
  
  // Create a static image URL from OpenStreetMap
  const staticMapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=113.8914,22.2783,114.2710,22.3493&layer=mapnik&marker=22.3138,114.0813`;

  return (
    <div className={styles.mapWrapper}>
      <iframe
        src={staticMapUrl}
        className={styles.map}
        title="Location map"
        loading="lazy"
      />
      <a 
        href={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.viewLarger}
      >
        View Larger Map
      </a>
    </div>
  );
};

export default MapComponent;
