import "dotenv/config"
import env from "./config/env.js";
import app from "./app.js";

app.listen(env.port, () => {
  console.log(`Server running on port http://localhost:${env.port}`);
});
