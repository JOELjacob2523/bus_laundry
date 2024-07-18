import "./googleMapRoutes.css";
import { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap,
} from "@vis.gl/react-google-maps";
import API from "../GoogleAPIKey";
import { Button, Card, Divider } from "antd";

function Directions() {
  const map = useMap();
  const routesLibary = useMapsLibrary("routes");
  const [directionsService, setDirectionService] = useState(null);
  const [directionsRenderer, setDirectionRenderer] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [routesIndex, setRoutesIndex] = useState(0);
  const selected = routes[routesIndex];
  const leg = selected?.legs ? selected?.legs[0] : null;

  useEffect(() => {
    if (!routesLibary || !map) return;
    setDirectionService(new routesLibary.DirectionsService());
    setDirectionRenderer(new routesLibary.DirectionsRenderer({ map }));
  }, [routesLibary, map]);

  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;
    const origin = "7 Karlsburg Rd, Highland Mills, NY 10930";
    const destination = "240 Forestburgh Rd, Monticello, NY 12701";
    directionsService
      .route({
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      })
      .then((response) => {
        console.log("Directions response:", response);
        //   directionsRenderer.setDirections(response);
        //   setRoutes(response.routes);
        // })
        if (response.status === "OK") {
          directionsRenderer.setDirections(response);
          setRoutes(response.routes);
        } else {
          console.error("Directions request failed: ", response.status);
        }
      })
      .catch((error) => {
        console.error("Error calculating directions:", error);
      });
  }, [directionsService, directionsRenderer]);

  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setOptions({
      directions: directionsRenderer.getDirections(),
      routeIndex: routesIndex,
    });
  }, [routesIndex, directionsRenderer]);

  if (!leg) return null;

  return (
    <div>
      <Card
        title={selected.summary}
        className="google_maps_directions_container"
      >
        <div>
          <div>
            <strong>{leg.start_address?.split(",")[0]}</strong> to{" "}
            <strong>{leg.end_address?.split(",")[0]}</strong>
          </div>
          <div>Distance: {leg.distance?.text}</div>
          <div>Duration: {leg.duration?.text}</div>

          <Divider orientation="left">Other Routes</Divider>
          <ul>
            {routes.map((route, index) => (
              <li key={route.summary}>
                <Button type="text" onClick={() => setRoutesIndex(index)}>
                  {route.summary}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
}

const GoogleMaps = () => {
  const position = { lat: 41.3204, lng: -74.1718 };

  return (
    <div className="google_maps_container">
      <APIProvider apiKey={API.GOOGLE_MAPS_API_KEY}>
        <div className="google_maps_map_container">
          <Map
            defaultCenter={position}
            defaultZoom={12}
            fullscreenControl={false}
          >
            <div>
              <Directions />
            </div>
          </Map>
        </div>
      </APIProvider>
    </div>
  );
};

export default GoogleMaps;
