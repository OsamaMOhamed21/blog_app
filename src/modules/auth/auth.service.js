import { connection } from "../../DB/connection.db.js";

export const signup = (req, res, next) => {
  const { firstName, lastName, middleName, password, email, confirmPassword } =
    req.body;
  console.log(req.body);

  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ message: "password missMatch confirmPassword" });
  }

  const findQuery = `SELECT *  FROM USER WHERE u_email=?`;
  connection.execute(findQuery, [email], (error, data) => {
    if (error) {
      return res
        .status(500)
        .json({ message: "fail to  run  this query", error });
    }
    if (data.length) {
      return res.status(409).json({ message: "email exist" });
    }

    const insertQuery = `INSERT INTO USER (u_firstName ,u_lastName ,u_middleName ,u_email ,u_password) values(?,?,?,?,?)`;

    connection.execute(
      insertQuery,
      [firstName, lastName, middleName, email, password],
      (error, data) => {
        if (error) {
          return res.status(500).json({ message: "fail to run this query" });
        }
        return res.status(201).json({ message: "signup", data });
      },
    );
  });
};

export const login = (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);

  const sql = `SELECT * FROM USER WHERE  u_email=? and u_password=?`;
  connection.execute(sql, [email, password], (error, data) => {
    if (error) {
      return res.status(500).json({ message: "fail to  run query", error });
    }
    if (!data.length) {
      return res.status(404).json({ message: "in-valid email or password" });
    }
    res.json({ message: "Done", user: data[0] });
  });
};
