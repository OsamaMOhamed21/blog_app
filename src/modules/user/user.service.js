import { connection } from "../../DB/connection.db.js";

export const users = (req, res, next) => {
  const sql = `SELECT * FROM USER`;
  connection.execute(sql, (error, data) => {
    if (error) {
      return res.status(500).json({ message: "fail to run this query" });
    }
    return res.json({ message: "done", data });
  });
};

export const search = (req, res, next) => {
  const { searchkey } = req.query;
  console.log({ searchkey });
  const sql = `SELECT * FROM USER WHERE u_firstName LIKE ?`;
  connection.execute(sql, ["%" + searchkey + "%"], (error, data) => {
    if (error) {
      return res.status(500).json({ message: "Fail TO execute this query" });
    }
    return data.length
      ? res.json({ message: "Done", data })
      : res.status(404).json({ message: "No Result" });
  });
};

export const profile = (req, res, next) => {
  const { id } = req.params;
  console.log({ id });
  const sql = `SELECT concat(u_firstName ,' ' , u_middleName , ' ' , u_lastName) as  fullName , u_email , u_id , convert(DATEDIFF(NOW() , u_DOB) / 365.5 , int) as age FROM USER WHERE u_id=?`;
  connection.execute(sql, [id], (error, data) => {
    if (error) {
      return res
        .status(500)
        .json({ message: "Fail execute this  query", error });
    }
    return data.length
      ? res.json({ message: "Done", data })
      : res.status(404).json({ message: "In-valid profile id" });
  });
};

export const update = (req, res, next) => {
  const { id } = req.params;
  const { DOB, firstName } = req.body;
  console.log({ DOB, firstName, id });
  const sql = `UPDATE USER SET u_DOB=? , u_firstName=? WHERE u_id=?`;
  connection.execute(sql, [DOB, firstName, id], (error, data) => {
    if (error) {
      return res
        .status(500)
        .json({ message: "Fail To  execute  this query", error });
    }
    return data.affectedRows
      ? res.json({ message: "done", data })
      : res.status(404).json({ message: "In-valid account id" });
  });
};

export const deleteUser = (req, res, next) => {
  const { id } = req.params;
  console.log({ id });
  const sql = `DELETE FROM  USER WHERE u_id=?`;
  connection.execute(sql, [id], (error, data) => {
    if (error) {
      return res
        .status(500)
        .json({ message: "Fail To execute This Query", error });
    }
    return data.affectedRows
      ? res.json({ message: "Done", data })
      : res.status(404).json({ message: "In-valid account Id" });
  });
};
