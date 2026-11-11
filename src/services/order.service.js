import { randomUUID } from "node:crypto";

const createOrder = (req, res) => {
  // generate ID
  const id = randomUUID()
  console.log(id)
};


export default createOrder