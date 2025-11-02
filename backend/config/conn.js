import mongoose from "mongoose";

const mongodb = async () => {
  mongoose.connection.on("connected", () => {
    console.log("DB Connected..");
  });
  await mongoose.connect(`${process.env.MONGO_DB}iclms`);
};
export default mongodb;

// import mysql from "mysql2/promise";
// const db = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
// });
// export default db;

// // import mongoose from "mongoose";

// // const mongodb = async () => {
// //   mongoose.connection.on('connected', () => {
// //     console.log("DB Connected..");
// //   });
// //   await mongoose.connect(`${process.env.MONGO_DB}/foods`)
// // };
// // export default mongodb;
