const express = require('express');
const server = express();
const PORT = process.env.PORT || 3000;
const router = require('./routes/router');

server.set('view engine', 'ejs')

server.use('/', router);

server.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
