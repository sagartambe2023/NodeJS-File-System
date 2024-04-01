const express = require("express"); // Importing Express module
const fs = require("fs"); // Importing File System module

const app = express(); // Creating an instance of Express
const PORT = 4000; // Setting the port number for the server to run on

// Middleware to log each request method and URL with timestamp
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Endpoint to display instructions for available endpoints
app.get("/", (req, res) => {
  res.send("NodeJS File System. Endpoint - 1 to create a new file type after url => /create-file. Endpoint - 2 to get all files type after url => /All-files");
});

// Endpoint to create a new file with current timestamp as filename
app.get("/create-file", (req, res) => {
  let currentTime = new Date();
  let year = currentTime.getFullYear();
  let month = (currentTime.getMonth() + 1).toString().padStart(2, "0");
  let day = currentTime.getDate().toString().padStart(2, "0");
  let hours = currentTime.getHours();
  let period = hours >= 12 ? "PM" : "AM";
  hours = (hours % 12).toString().padStart(2, "0");
  let minutes = currentTime.getMinutes().toString().padStart(2, "0");
  let seconds = currentTime.getSeconds().toString().padStart(2, "0");
  let currentTimeStamp = `${hours}-${minutes}-${seconds} ${period}`;
  let fileName = `${day}-${month}-${year}-${hours}-${minutes}-${seconds}`;
  const fileData =  `current TimeStamp - ${currentTimeStamp.toString()}`;

  // Writing data into a new file with dynamically generated filename
  fs.writeFile(`./TextFiles/${fileName}.txt`, fileData, (err) => {
    if (err) {
      console.error("Unable to enter data into the file", err);
      res.status(500).send("Unable to write data into file");
      return;
    }
    console.log(`${fileName} added`);
    res.send(`${fileName}.txt file created successfully`);
  });
});

// Endpoint to get a list of all files in the TextFiles directory
app.get("/All-files", (req, res) => {
  fs.readdir("./TextFiles", (err, files) => {
    if (err) {
      console.error("Unable to read all the files", err);
      res.status(500).send("Unable to read the files");
      return;
    }
    const fileList = files.map((file) => `${file}`).join("");
    res.send(`All Files:${fileList} ,`);
  });
});

// Handling invalid endpoints
app.get('/*', (req, res) => {
  res.status(404).send(`Page not found`);
});

// Starting the server
app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
