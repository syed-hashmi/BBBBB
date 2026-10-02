const express = require("express");
const { Server } = require("socket.io");
const { createServer } = require("http");
const { Socket } = require("dgram");


const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173"
  }
});

const ships = [
    {
        shipId: "SHIP-001",
        name: "MSC Aurora",
        latitude: 33.4539,
        longitude: 35.3773,
        status: "In Transit",
        heading: 90
    },
    {
        shipId: "SHIP-002",
        name: "Maersk Horizon",
        latitude: 48.5102,
        longitude: 48.6201,
        status: "In Transit",
        heading: 120
    },
    {
        shipId: "SHIP-003",
        name: "CMA CGM Atlas",
        latitude: 21.3856,
        longitude: 22.2154,
        status: "Anchored",
        heading: 45
    },
    {
        shipId: "SHIP-004",
        name: "Ever Glory",
        latitude: 22.6205,
        longitude: 21.4812,
        status: "In Transit",
        heading: 180
    },
    {
        shipId: "SHIP-005",
        name: "Hapag Express",
        latitude: 11.2901,
        longitude: 11.5307,
        status: "Docked",
        heading: 270
    }
];



io.on('connection', (socket) => {
    console.log("connection established");

     const interval = setInterval(() => {
        ships.forEach((ship) => {
            // Simulate movement
            
                ship.longitude += 0.0025;
                ship.latitude += 0.0025;
           
        });

        // Send all ships
        socket.emit("ship-locations", ships);
    }, 1000);


    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);

        clearInterval(interval);
    });

});

app.get("/", (req, res) => {
    res.json("hellow from sarosh");
})

server.listen(3000, () => {
    console.log("server is running ON PORT 3000");
})