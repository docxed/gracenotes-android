const express = require("express");
const path = require("path");
const pool = require("../config");

router = express.Router();

router.get("/grace", async function (req, res, next) {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    let [result, _] = await conn.query(
      `SELECT * FROM grace ORDER BY grace_id ASC;`
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

router.get("/grace/:id", async function (req, res, next) {
    const uid = req.params.id;
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
      let [result, _] = await conn.query(
        `SELECT * FROM grace WHERE grace_id=?;`
        , [uid]
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

router.post("/grace", async function (req, res, next) {
    const time = req.body.time;
    const date = req.body.date;
    const detail = req.body.detail;
    const agency = req.body.agency;
    const img = req.body.img;
    const sid = req.body.sid;
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
      let [result, _] = await conn.query(
        `INSERT INTO grace (grace_time, grace_date, grace_detail, grace_agency, member_id) VALUES (?, ?, ?, ?, ?, ?);`
        , [time, date, detail, agency, img, sid]
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

router.delete("/grace/:id", async function (req, res, next) {
    const uid = req.params.id;
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
      let [result, _] = await conn.query(
        `DELETE FROM grace WHERE grace_id=?;`
        , [uid]
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
