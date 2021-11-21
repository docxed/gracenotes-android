const express = require("express");
const path = require("path");
const pool = require("../config");

router = express.Router();

router.get("/social", async function (req, res, next) {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    let [result, _] = await conn.query(
      `SELECT * FROM social ORDER BY social_id ASC;`
    );
    res.status(200).json(result);
    await conn.commit();
  } catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    conn.release();
  }
});

router.get("/social/:id", async function (req, res, next) {
  const uid = req.params.id;
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    let [result, _] = await conn.query(
      `SELECT * FROM social WHERE social_id=?;`,
      [uid]
    );
    res.status(200).json(result[0]);
    await conn.commit();
  } catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    conn.release();
  }
});

router.get("/socialadmin/:id", async function (req, res, next) {
  const uid = req.params.id;
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    let [result, _] = await conn.query(
      `SELECT * FROM social WHERE social_id=?;`,
      [uid]
    );
    res.status(200).json(result[0]);
    await conn.commit();
  } catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    conn.release();
  }
});

router.post("/social", async function (req, res, next) {
  const detail = req.body.detail;
  const img = req.body.img;
  const sid = req.body.sid;
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    let [result, _] = await conn.query(
      `INSERT INTO social (social_detail, social_img, member_id) VALUES (?, ?, ?);`,
      [detail, img, sid]
    );
    res.status(200).send("เผยแพร่สำเร็จแล้ว");
    await conn.commit();
  } catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    conn.release();
  }
});

router.put("/socialadmin/:id", async function (req, res, next) {
  const uid = req.params.id;
  const detail = req.body.detail;
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    let [result, _] = await conn.query(
      `UPDATE social SET social_detail=? WHERE social_id=?;`,
      [detail, uid]
    );
    res.status(200).send("อัปเดตโพสต์แล้ว");
    await conn.commit();
  } catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    conn.release();
  }
});

router.delete("/socialadmin/:id", async function (req, res, next) {
  const uid = req.params.id;
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    let [result, _] = await conn.query(
      `DELETE FROM social WHERE social_id=?;`,
      [uid]
    );
    res.status(200).send("ลบโพสต์แล้ว");
    await conn.commit();
  } catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    conn.release();
  }
});

router.post("/comment/:id", async function (req, res, next) {
  const uid = req.params.id;
  const detail = req.body.detail;
  const sid = req.body.sid;
  console.log(detail);
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    let [result, _] = await conn.query(
      `INSERT INTO comment (comment_detail, member_id, social_id) VALUES (?, ?, ?);`,
      [detail, sid, uid]
    );
    res.status(200).send("คอมเมนต์แล้ว");
    await conn.commit();
  } catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    conn.release();
  }
});

router.get("/comment/:id", async function (req, res, next) {
  const uid = req.params.id;
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    let [result, _] = await conn.query(
      `SELECT * FROM comment WHERE social_id=?;`,
      [uid]
    );
    res.status(200).json(result);
    await conn.commit();
  } catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    conn.release();
  }
});

router.delete("/comment/:id", async function (req, res, next) {
  const uid = req.params.id;
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    let [result, _] = await conn.query(
      `DELETE FROM comment WHERE comment_id=?;`,
      [uid]
    );
    res.status(200).json(result);
    await conn.commit();
  } catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    conn.release();
  }
});

router.get("/status/:id", async function (req, res, next) {
  const uid = req.params.id;
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    let [result, _] = await conn.query(
      `SELECT * FROM status WHERE social_id=?;`,
      [uid]
    );
    res.status(200).json(result);
    await conn.commit();
  } catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    conn.release();
  }
});

router.post("/status/:id", async function (req, res, next) {
  const uid = req.params.id;
  const type = req.body.type;
  const sid = req.body.sid;
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    await conn.query("DELETE FROM status WHERE social_id=? AND member_id=?", [
      uid,
      sid,
    ]);
    let [result, _] = await conn.query(
      `INSERT INTO status (status_type, member_id, social_id) VALUES (?, ?, ?);`,
      [type, sid, uid]
    );
    res.status(200).json(result);
    await conn.commit();
  } catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    conn.release();
  }
});

router.delete("/status/:uid/:sid", async function (req, res, next) {
  const uid = req.params.uid;
  const sid = req.params.sid;
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    let [result, _] = await conn.query(
      `DELETE FROM status WHERE member_id=? AND social_id=?;`,
      [sid, uid]
    );
    res.status(200).json(result);
    await conn.commit();
  } catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    conn.release();
  }
});

exports.router = router;
