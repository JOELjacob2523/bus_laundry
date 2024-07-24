import "./googleMapRoutes.css";
import { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap,
} from "@vis.gl/react-google-maps";
import API from "../GoogleAPIKey";
import { Button, Card, Divider, Select, Modal, message } from "antd";
import { getAllUserInfo } from "../../servers/getRequest";
import jsPDF from "jspdf";

const { Option } = Select;

function Directions() {
  const map = useMap();
  const routesLibary = useMapsLibrary("routes");
  const [directionsService, setDirectionService] = useState(null);
  const [directionsRenderer, setDirectionRenderer] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [routesIndex, setRoutesIndex] = useState(0);
  const [originInput, setOriginInput] = useState("");
  const [destinationInput, setDestinationInput] = useState("");
  const [validAddresses, setValidAddresses] = useState([]);
  const [savedRoutes, setSavedRoutes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selected = routes[routesIndex];
  const leg = selected?.legs ? selected?.legs[0] : null;

  useEffect(() => {
    const fetchData = async () => {
      const studentData = await getAllUserInfo();
      const addresses = studentData
        .map((student) => student.address2)
        .filter((address) => address); // filter out empty addresses
      setValidAddresses(addresses);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!routesLibary || !map) return;
    setDirectionService(new routesLibary.DirectionsService());
    setDirectionRenderer(new routesLibary.DirectionsRenderer({ map }));
  }, [routesLibary, map]);

  useEffect(() => {
    if (
      !directionsService ||
      !directionsRenderer ||
      !originInput ||
      !destinationInput
    )
      return;
    const origin = originInput;
    const destination = destinationInput;
    directionsService
      .route({
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      })
      .then((response) => {
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
  }, [directionsService, directionsRenderer, originInput, destinationInput]);

  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setOptions({
      routeIndex: routesIndex,
    });
    const directions = directionsRenderer.getDirections();
    if (directions) {
      directionsRenderer.setDirections(directions);
    }
  }, [routesIndex, directionsRenderer]);

  const handleOriginChange = (value) => {
    setOriginInput(value);
  };

  const handleDestinationChange = (value) => {
    setDestinationInput(value);
  };

  const handleSaveRoute = () => {
    if (selected) {
      setSavedRoutes((prevRoutes) => {
        const updatedRoutes = [...prevRoutes, selected];
        message.open({
          type: "success",
          content: "Route added successfully",
        });
        return updatedRoutes;
      });
    } else {
      console.log("No route selected to save.");
    }
  };

  useEffect(() => {
    console.log("Updated Saved Routes:", savedRoutes);
  }, [savedRoutes]);

  const handleDownloadRoutes = () => {
    const doc = new jsPDF();

    savedRoutes.forEach((route, index) => {
      doc.text(`Route ${index + 1}`, 10, 10 + index * 20);
      doc.text(
        `Start Address: ${route?.legs?.[0]?.start_address || "N/A"}`,
        10,
        20 + index * 20
      );
      doc.text(
        `End Address: ${route?.legs?.[0]?.end_address || "N/A"}`,
        10,
        30 + index * 20
      );
      doc.text(`Summary: ${route.summary || "N/A"}`, 10, 40 + index * 20);
    });

    doc.save(`saved_routes_${new Date().toDateString()}.pdf`);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    handleDownloadRoutes();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Card
        title={selected ? selected.summary : "Select origin and destination"}
        size="small"
        className="google_maps_directions_container"
      >
        <div>
          <div>
            <Select
              showSearch
              placeholder="Select origin"
              value={originInput}
              onChange={handleOriginChange}
              style={{ width: 200, marginRight: 10 }}
            >
              {validAddresses.map((address, index) => (
                <Option key={index} value={address}>
                  {address}
                </Option>
              ))}
            </Select>
            <Select
              showSearch
              value={destinationInput}
              placeholder="Select destination"
              onChange={handleDestinationChange}
              style={{ width: 200, marginRight: 10 }}
            >
              {validAddresses.map((address, index) => (
                <Option key={index} value={address}>
                  {address}
                </Option>
              ))}
            </Select>
          </div>
          <div>
            {leg && (
              <>
                <div className="result_container">
                  You selected:{" "}
                  <strong>{leg.start_address?.split(",")[0]}</strong> to{" "}
                  <strong>{leg.end_address?.split(",")[0]}</strong>
                </div>
              </>
            )}
          </div>
          {leg && (
            <>
              <div className="distance_duration_container">
                <div>Distance: {leg.distance?.text}</div>
                <div>Duration: {leg.duration?.text}</div>
              </div>

              <div className="save_route_btn_container">
                <Button type="primary" onClick={handleSaveRoute}>
                  Save Route
                </Button>
              </div>

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
              <div className="download_btn_container">
                <Button
                  type="default"
                  onClick={showModal}
                  style={{ marginTop: 10 }}
                >
                  Download Saved Routes
                </Button>
              </div>
            </>
          )}
        </div>
      </Card>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Download"
      >
        <div>
          {savedRoutes.map((route, index) => (
            <div key={index}>
              <div>
                Start at: <strong>{route?.legs?.[0]?.start_address}</strong>
              </div>{" "}
              <div>
                Going to: <strong>{route?.legs?.[0]?.end_address}</strong>
              </div>
            </div>
          ))}
        </div>
      </Modal>
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
            defaultZoom={15}
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
