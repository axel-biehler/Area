const express = require('express');
const cors = require('cors');

const main = async () => {
    const app = express();
    const port = process.env.PORT || 8080

    app.use(cors());
}