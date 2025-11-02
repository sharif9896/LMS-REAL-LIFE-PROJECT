import dotenv from "dotenv";

const JWT_USERPASSWORD = process.env.JWT_USERPASSWORD;
const JWT_ADMINKEY = process.env.JWT_ADMINKEY;

export default { JWT_USERPASSWORD, JWT_ADMINKEY };
