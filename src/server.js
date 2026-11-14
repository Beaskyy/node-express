import app from "./app.js";

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Beasky")
})

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
