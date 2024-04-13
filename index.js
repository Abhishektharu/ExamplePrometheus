// Importing required modules
const express = require('express');
const {anyTask} = require('./util');
// Creating an Express application
const app = express();
const client = require('prom-client');  //metric collection 
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({register: client.register});


// Define a route to handle incoming requests
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/slow', async(req, res) => {
    try {
        
        // 2 seconds delay
        const timeTaken = await anyTask();
        return  res.json({
            status: "success",
            message: `task completed in ${timeTaken} ms`
        });

    } catch (error) {
        logger.error(`${error.message}`);
        console.error('Error occurred:', error);
        res.status(500).send('An error occurred while performing the task.');
    }
});


app.get('/metrics', async(req, res)=>{
    res.setHeader("Content-Type", client.register.contentType);
    const metrics = await(client.register.metrics());
    res.send(metrics);
})




//logging 
const { createLogger, transports } = require("winston");
const LokiTransport = require("winston-loki");
const options = {
  
  transports: [
    new LokiTransport({
      host: "http://192.168.1.65:3100"
    })
  ]
};
const logger = createLogger(options);





// Define the port number
const port = 8000;

// Start the server and listen on the defined port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
