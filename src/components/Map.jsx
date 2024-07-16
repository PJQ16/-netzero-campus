import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

function Map({ address, latitude, longitude, detail, setLatitude, setLongitude }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyA1_fhj9BM9toksnO1zW2R9ftUP46UPFvU"
  });

  const [markerPosition, setMarkerPosition] = useState({ lat: latitude, lng: longitude });
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);

  const onMarkerClick = () => {
    setIsInfoWindowOpen(!isInfoWindowOpen); // Toggle InfoWindow visibility
  };

  const onMarkerDragEnd = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setMarkerPosition({ lat, lng });
    setLatitude(lat);
    setLongitude(lng);
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '500px', borderRadius: '20px' }}
      center={markerPosition}
      zoom={12}
    >
      <Marker
        position={markerPosition}
        draggable={true}
        onDragEnd={onMarkerDragEnd}
        onClick={onMarkerClick}
      >
        {isInfoWindowOpen && (
          <InfoWindow position={markerPosition} onCloseClick={() => setIsInfoWindowOpen(false)}>
            <div>
              <p>{detail}</p>
              <p>{address}</p>
              <p>Latitude: {markerPosition.lat}</p>
              <p>Longitude: {markerPosition.lng}</p>
            </div>
          </InfoWindow>
        )}
      </Marker>
    </GoogleMap>
  ) : <></>;
}

export default React.memo(Map);
