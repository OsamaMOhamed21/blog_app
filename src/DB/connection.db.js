import mysql2 from "mysql2";

export const connection = mysql2.createConnection({
  database: "blogapp",
  port: "3306",
  password: "",
  user: "root",
});

export function testConnectionDB() {
  return connection.connect((error) => {
    if (error) {
      console.log("fail connect on DB");
    } else {
      console.log("connect in DB");
    }
  });
}
