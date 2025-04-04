import React, { useState, useEffect } from "react";
import styles from "./MapComponent.module.css";

const MapComponent: React.FC = () => {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    setIframeLoaded(true);
  }, []);

  if (!iframeLoaded) {
    return "There is an error occured while requesting the map.";
  }

  /* Variables for map configuration.*/
  const latitude = 37.1645;
  const longitude = 28.3737;
  const zoomLevel = 18;
  const mapLanguage = "tr";

  return (
    <div className={styles.main}>
      <iframe
        title="cerkezimLocation"
        className="mapiframe"
        height="600"
        src={`https://maps.google.com/maps?hl=${mapLanguage}&q=${latitude},${longitude}&t=&z=${zoomLevel}&ie=UTF8&iwloc=B&output=embed`}
      ></iframe>
    </div>
  );
};

export default MapComponent;
