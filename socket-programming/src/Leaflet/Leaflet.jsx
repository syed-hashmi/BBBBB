
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import { io } from "socket.io-client"

// const ships = [
//   {
//     id: "SHIP-001",
//     name: "MSC Aurora",
//     latitude: 24.4539,
//     longitude: 54.3773,
//     status: "In Transit"
//   },
//   {
//     id: "SHIP-002",
//     name: "Maersk Horizon",
//     latitude: 24.5102,
//     longitude: 54.6201,
//     status: "In Transit"
//   },
//   {
//     id: "SHIP-003",
//     name: "CMA CGM Atlas",
//     latitude: 24.3856,
//     longitude: 54.2154,
//     status: "Anchored"
//   },
//   {
//     id: "SHIP-004",
//     name: "Ever Glory",
//     latitude: 24.6205,
//     longitude: 54.4812,
//     status: "In Transit"
//   },
//   {
//     id: "SHIP-005",
//     name: "Hapag Express",
//     latitude: 24.2901,
//     longitude: 54.5307,
//     status: "Docked"
//   }
// ];



const Leaflet = () => {
  const mapRef = useRef(null);
  const markerRef = useRef(new Map());

  
  useEffect(() => {
    let map;
    if (!mapRef.current) {
      map = L.map("map").setView(
        [24.4539, 54.3773],
        10
      );

      mapRef.current = map;

      // 2. Add tile layer ONCE
      L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
        {
          attribution:
            "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ",
          maxZoom: 16
        }
      ).addTo(map);
    }
    let socket;
    if (!socket) {
      socket = io("http://localhost:3000");
    }
    socket.on("connect", () => {
      console.log("connected:", socket.id);
      console.log("recovered:", socket.recovered);
    })
    socket.on("ship-locations", (ships) => {

      ships.forEach((ship) => {
        const existingMarker = markerRef.current.get(ship.shipId);

        if (!existingMarker) {
          let marker = L.marker([
            ship.latitude,
            ship.longitude
          ])
            .addTo(mapRef.current);
          markerRef.current.set(ship?.shipId, marker);
        }
        else {
          existingMarker.setLatLng([
            ship.latitude,
            ship.longitude
          ]);
        }
      })

      return () => {
        socket.disconnect();
      }
    });

    socket.on("disconnect",()=>{
     })
  });

  return <div id="map" style={{ height: "500px" }} />;
}

export default Leaflet