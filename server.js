const express = require('express');
const cors = require('cors');
const FileUpload = require('express-fileupload')
const port = 8000;
const app = express()

app.use(cors())
app.use(express.json())
app.use(FileUpload())
app.use(express.static('public'))
app.use(`/api/v1`, require("./routes"));

app.listen(port, () => console.log(`App listening on port http://localhost:${port}!`));