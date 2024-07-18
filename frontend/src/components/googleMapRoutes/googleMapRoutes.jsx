// import React, { useState, useRef, useCallback } from "react";
// import {
//   GoogleMap,
//   LoadScript,
//   Autocomplete,
//   DirectionsService,
//   DirectionsRenderer,
// } from "@react-google-maps/api";
// import API from "../GoogleAPIKey";

// const libraries = ["places"];

// const MapComponent = () => {
//   const [map, setMap] = useState(null);
//   const [directions, setDirections] = useState(null);
//   const [autocomplete, setAutocomplete] = useState(null);
//   const [response, setResponse] = useState(null);
//   const originRef = useRef(null);
//   const destinationRef = useRef(null);

//   const onLoad = useCallback((mapInstance) => {
//     setMap(mapInstance);
//   }, []);

//   const onLoadAutocomplete = (autocompleteInstance) => {
//     setAutocomplete(autocompleteInstance);
//   };

//   const onPlaceChanged = () => {
//     if (autocomplete !== null) {
//       const place = autocomplete.getPlace();
//       if (!place.geometry) {
//         console.log("Place details not available for input: ", place);
//         return;
//       }
//       console.log("Place selected: ", place.formatted_address);
//     } else {
//       console.log("Autocomplete is not loaded yet!");
//     }
//   };

//   const calculateRoute = () => {
//     if (!originRef.current || !destinationRef.current) {
//       return;
//     }

//     const originValue = originRef.current.value.trim();
//     const destinationValue = destinationRef.current.value.trim();

//     if (originValue === "" || destinationValue === "") {
//       return;
//     }

//     setResponse(null);
//     setDirections({
//       origin: originRef.current.value,
//       destination: destinationRef.current.value,
//       travelMode: window.google.maps.TravelMode.DRIVING,
//     });
//   };

//   const directionsCallback = (response) => {
//     if (response !== null) {
//       if (response.status === "OK") {
//         setResponse(response);
//       } else {
//         console.log("response: ", response);
//       }
//     }
//   };

//   return (
//     <LoadScript
//       googleMapsApiKey={API.GOOGLE_MAPS_API_KEY}
//       libraries={libraries}
//     >
//       <GoogleMap
//         id="map"
//         mapContainerStyle={{ height: "700px", width: "900px" }}
//         zoom={10}
//         center={{ lat: 41.3204, lng: -74.1718 }}
//         onLoad={onLoad}
//       >
//         <Autocomplete
//           onLoad={onLoadAutocomplete}
//           onPlaceChanged={onPlaceChanged}
//         >
//           <input
//             type="text"
//             placeholder="Enter origin"
//             ref={originRef}
//             style={{ width: "300px", height: "40px" }}
//           />
//         </Autocomplete>
//         <Autocomplete
//           onLoad={onLoadAutocomplete}
//           onPlaceChanged={onPlaceChanged}
//         >
//           <input
//             type="text"
//             placeholder="Enter destination"
//             ref={destinationRef}
//             style={{ width: "300px", height: "40px" }}
//           />
//         </Autocomplete>
//         <button onClick={calculateRoute}>Get Directions</button>
//         {directions && (
//           <DirectionsService
//             options={directions}
//             callback={directionsCallback}
//           />
//         )}
//         {response && (
//           <DirectionsRenderer
//             options={{
//               directions: response,
//             }}
//           />
//         )}
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default MapComponent;

import React, { useState, useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  Autocomplete,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import API from "../GoogleAPIKey";

const libraries = ["places"];

const MapComponent = () => {
  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  const originRef = useRef(null);
  const destinationRef = useRef(null);
  const [estimatedTime, setEstimatedTime] = useState(null);

  const onLoad = (mapInstance) => {
    setMap(mapInstance);
  };

  const onPlaceChanged = () => {
    const originValue = originRef.current.value.trim();
    const destinationValue = destinationRef.current.value.trim();

    if (originValue !== "" && destinationValue !== "") {
      setDirections({
        origin: originValue,
        destination: destinationValue,
        travelMode: "DRIVING",
      });
    }
  };

  const directionsCallback = (response) => {
    if (response !== null && response.status === "OK") {
      const route = response.routes[0];
      const duration = route.legs[0].duration.text;
      setEstimatedTime(duration);
    } else {
      console.log("Directions request failed: ", response);
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={API.GOOGLE_MAPS_API_KEY}
      libraries={libraries}
      loadingElement={"Loading..."}
      onLoad={() => console.log("Google Maps loaded successfully")}
    >
      <GoogleMap
        id="map"
        mapContainerStyle={{ height: "400px", width: "800px" }}
        zoom={10}
        center={{ lat: 41.3204, lng: -74.1718 }}
        onLoad={onLoad}
      >
        {/* Autocomplete for Origin */}
        <Autocomplete
          onLoad={(autocomplete) => (originRef.current = autocomplete)}
          onPlaceChanged={onPlaceChanged}
        >
          <input
            type="text"
            placeholder="Enter origin"
            ref={originRef}
            style={{ width: "300px", height: "40px", marginBottom: "10px" }}
          />
        </Autocomplete>

        {/* Autocomplete for Destination */}
        <Autocomplete
          onLoad={(autocomplete) => (destinationRef.current = autocomplete)}
          onPlaceChanged={onPlaceChanged}
        >
          <input
            type="text"
            placeholder="Enter destination"
            ref={destinationRef}
            style={{ width: "300px", height: "40px", marginBottom: "10px" }}
          />
        </Autocomplete>

        {/* Display estimated time */}
        {estimatedTime && (
          <div style={{ marginBottom: "10px" }}>
            Estimated time: {estimatedTime}
          </div>
        )}

        {/* DirectionsService to calculate and display route */}
        {directions && (
          <DirectionsService
            options={directions}
            callback={directionsCallback}
          />
        )}

        {/* DirectionsRenderer to display the route on the map */}
        {directions && (
          <DirectionsRenderer options={{ directions: directions }} />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
