const express = require("express");
const path = require("path");
const pool = require("../config");

router = express.Router();

router.get("/user", async function (req, res, next) {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    let [result, _] = await conn.query(
      `SELECT * FROM members ORDER BY member_id ASC;`
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

router.get("/user/:id", async function (req, res, next) {
  const uid = req.params.id;
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    let [result, _] = await conn.query(
      `SELECT * FROM members WHERE member_id = ?;`, [uid]
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

router.put("/user/:id", async function (req, res, next) {

  const uid = req.params.id;
  const user = req.body.user;
  const fname = req.body.fname;
  const lname = req.body.lname;
  const classes = req.body.classes;
  const no = req.body.no;
  const dob = req.body.dob;
  const address = req.body.address;
  const pass = req.body.pass;
  const level = req.body.level;
  console.log(uid)
  console.log(req.body)

  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    let [result, _] = await conn.query(
      `UPDATE members SET member_user=?, member_fname=?, member_lname=?, member_class=?, member_no=?, member_dob=?, member_address=?, member_password=?, member_level=? WHERE member_id=?;`,
      [user, fname, lname, classes, no, dob, address, pass, level, uid]
    );
    res.status(200).send("อัปเดตข้อมูลแล้ว");
    await conn.commit();
  } catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    conn.release();
  }
});

router.delete("/user/:id", async function (req, res, next) {
  const uid = req.params.id;
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    let [result, _] = await conn.query(
      `DELETE FROM members WHERE member_id=?;`,
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

router.put("/userlevel/:id", async function (req, res, next) {
  const uid = req.params.id;
  const level = req.body.level;
  console.log(uid)
  console.log(req.body)

  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    let [result, _] = await conn.query(
      `UPDATE members SET member_level=? WHERE member_id=?;`,
      [level, uid]
    );
    res.status(200).send("ตั้งบทบาทแล้ว");
    await conn.commit();
  } catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    conn.release();
  }
});

exports.router = router;
