import { connection } from "../../DB/connection.db.js";

export const create = (req, res, next) => {
  const { title, content, authorId } = req.body;
  console.log(req.body);
  const sql = `SELECT * FROM USER WHERE u_id=?`;
  connection.execute(sql, [authorId], (error, data) => {
    if (error) {
      return res.status(500).json({ message: "Fail execute this query" });
    }
    if (!data.length) {
      return res.status(404).json({ message: "In-valid author id" });
    }

    const insertSql = `INSERT INTO BLOGS (b_title, b_content, b_author_id) VALUES (?, ?, ?)`;

    connection.execute(insertSql, [title, content, authorId], (error, data) => {
      if (error) {
        return res
          .status(500)
          .json({ message: "Fail execute this query", error });
      }
      res.status(201).json({ message: "Done", data });
    });
  });
};

export const blogs = (req, res, next) => {
  const sql = `SELECT * FROM USER RIGHT JOIN BLOGS ON USER.u_id=BLOGS.b_author_id`;
  connection.execute(sql, (error, data) => {
    if (error) {
      return res
        .status(500)
        .json({ message: "Fail To Execute This Query" }, error);
    }
    return res.json({ message: "Done", data });
  });
};
