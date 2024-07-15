import React, { useState, useRef, useCallback } from "react";
import {
  GoogleMap,
  LoadScript,
  Autocomplete,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";

const libraries = ["places"];

const MapComponent = () => {
  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [response, setResponse] = useState(null);
  const originRef = useRef(null);
  const destinationRef = useRef(null);

  const onLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  const onLoadAutocomplete = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      console.log(place);
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  const calculateRoute = () => {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }
    setResponse(null);
    setDirections({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });
  };

  const directionsCallback = (response) => {
    if (response !== null) {
      if (response.status === "OK") {
        setResponse(response);
      } else {
        console.log("response: ", response);
      }
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY}
      libraries={libraries}
    >
      <GoogleMap
        id="map"
        mapContainerStyle={{ height: "400px", width: "800px" }}
        zoom={10}
        center={{ lat: 40.748817, lng: -73.985428 }}
        onLoad={onLoad}
      >
        <Autocomplete
          onLoad={onLoadAutocomplete}
          onPlaceChanged={onPlaceChanged}
        >
          <input
            type="text"
            placeholder="Enter origin"
            ref={originRef}
            style={{ width: "300px", height: "40px" }}
          />
        </Autocomplete>
        <Autocomplete
          onLoad={onLoadAutocomplete}
          onPlaceChanged={onPlaceChanged}
        >
          <input
            type="text"
            placeholder="Enter destination"
            ref={destinationRef}
            style={{ width: "300px", height: "40px" }}
          />
        </Autocomplete>
        <button onClick={calculateRoute}>Get Directions</button>
        {directions && (
          <DirectionsService
            options={directions}
            callback={directionsCallback}
          />
        )}
        {response && (
          <DirectionsRenderer
            options={{
              directions: response,
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
