const express = require("express");

const app = express();
const PORT = 4000;

// Serve static files from the 'public' folder
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
