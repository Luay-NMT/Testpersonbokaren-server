const express = require('express');
const app = express();
const cors = require("cors");
const config = require('./config');
var swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./API-doc/api-doc")

app.use(cors());
app.use(express.json());

const personer = require('./routes/persons');
const bookings = require('./routes/bookings');
const users = require('./routes/users');
const search = require('./routes/search');
const groups = require('./routes/groups');

app.use('/persons', personer);
app.use('/bookings', bookings);
app.use('/users', users);
app.use('/search', search);
app.use('/groups', groups);

  // OpenAPI UI
  app.use(
    "/api-documentation",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocs, {
      swaggerOptions: {
        url: "http://localhost:5000/api-docs",
        supportedSubmitMethods: [],
      },
    })
  );


app.listen(config.server.port, () => { console.log(`Server started on port ${config.server.port} `),
    console.log(`OpenAPI documentation available in http://localhost:${config.server.port}/api-documentation`);});
