import app from "./app.js";
import env from "./config/env.js";

console.log(env.nodeEnv);


app.get("/", (req, res) => {
  res.send("Beasky");
});

app.listen(env.port, () => {
  console.log(`Server running on port http://localhost:${env.port}`);
});
