
// Using HTTP Module
// const http = require("http");
// const host = 'localhost';
// const port = 8000;
// const requestListener = function (req, res) {};
// const server = http.createServer(requestListener);
// server.listen(port, host, () => {
//     console.log(`Server is running on http://${host}:${port}`);
// });

const constant = require('./config/constant')
const bodyParser = require('body-parser');
const fs = require('fs');
const PORT = constant.SERVER.PORT;
const HOST = constant.SERVER.HOST;

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
// const customCss = fs.readFileSync((process.cwd()+"/swagger.css"), 'utf8');


// Using expressjs lib
const express = require('express');

const app = express();
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


  
app.get('/api/v1/products', (req, res)=>{
    res.status(200);
    res.send(`
    <html>

<head>
    <title>TradeBridge</title>
    <style>
        body {background-color: navy; margin: 300px;}
        h1   {color: white;}
        p    {color: red;}
        h3   {color: greenyellow; }
    </style>
</head>

<body>
    <center>
        <div>
            <h3>**********************************************************</h3>
            <h1>Welcome to TradeBridge Dashboard</h1>
            <h3>**********************************************************</h3>
        </div>
    </center>
</body>

</html>   
    `);
});
  
app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port ", + PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);


