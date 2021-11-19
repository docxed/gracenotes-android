
const express = require("express");
const path = require("path");
const pool = require("../config");

router = express.Router();

router.post("/aid", async function (req, res, next) {
    const head = req.body.head;
    const body = req.body.body;
    const location = req.body.location;
    const datetime = req.body.datetime;
    const sid = req.body.sid;
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
      let [result, _] = await conn.query(
        `INSERT INTO aid (aid_head, aid_body, aid_location, aid_datetime, member_id) VALUES (?, ?, ?, ?, ?);`
        , [head, body, location, datetime, sid]
      );
      res.status(200).send("โพสต์สำเร็จแล้ว");
      await conn.commit();
    } catch (err) {
      await conn.rollback();
      return res.status(400).json(err);
    } finally {
      conn.release();
    }
});

router.get("/aid", async function (req, res, next) {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    let [result, _] = await conn.query(
      `SELECT * FROM aid ORDER BY aid_id ASC;`
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

router.get("/aid/:id", async function (req, res, next) {
  const uid = req.params.id;
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    let [result, _] = await conn.query(
      `SELECT * FROM aid WHERE aid_id = ?;`, [uid]
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

router.put("/aidstate/:id", async function (req, res, next) {
  const uid = req.params.id;
  const state = req.body.state;
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    let [result, _] = await conn.query(
      `UPDATE aid SET aid_state=? WHERE aid_id=?;`,
      [state, uid]
    );
    res.status(200).send("ลบข้อมูลแล้ว");
    await conn.commit();
  } catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    conn.release();
  }
});


router.delete("/aid/:id", async function (req, res, next) {
  const uid = req.params.id;
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    let [result, _] = await conn.query(
      `DELETE FROM aid WHERE aid_id=?;`,
      [uid]
    );
    res.status(200).send("ลบข้อมูลแล้ว");
    await conn.commit();
  } catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    conn.release();
  }
});

router.get("/sub", async function (req, res, next) {
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
      let [result, _] = await conn.query(
        `SELECT * FROM aid_sub ORDER BY sub_id ASC;`
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

router.get("/sub/history", async function (req, res, next) {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    let [result, _] = await conn.query(
      `SELECT * FROM aid JOIN aid_sub USING (aid_id) ORDER BY sub_id ASC;`
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


router.post("/sub/:id", async function (req, res, next) {
    const uid = req.params.id;
    const sid = req.body.sid;
    
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
      let [result, _] = await conn.query(
        `INSERT INTO aid_sub (aid_id, member_id) VALUES (?, ?);`
        , [uid, sid]
      );
      res.status(200).send("เข้าร่วมแล้ว");
      await conn.commit();
    } catch (err) {
      await conn.rollback();
      return res.status(400).json(err);
    } finally {
      conn.release();
    }
});

router.delete("/sub/:id", async function (req, res, next) {
    const uid = req.params.id;
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
      let [result, _] = await conn.query(
        `DELETE FROM aid_sub WHERE sub_id=?;`,
        [uid]
      );
      res.status(200).send("ลบข้อมูลแล้ว");
      await conn.commit();
    } catch (err) {
      await conn.rollback();
      return res.status(400).json(err);
    } finally {
      conn.release();
    }
  });

exports.router = router;
