const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs/promises");
const layerInfoPath = path.join(__dirname, "layerInfo.json");
const app = express();
const port = 5000;
const reactPort = 5173;

app.use(cors({origin: `http://localhost:${reactPort}`}));

app.get("/api/layers", async (req, res) => {
    try {
        const data = await fs.readFile(layerInfoPath, "utf-8");
        const layerInfo = JSON.parse(data);
        return res.status(200).json(layerInfo);

    } catch(e) {
        return res.status(500).json({"message": "An error was encountered"});
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})