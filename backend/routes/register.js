const express = require("express")
const path = require("path")
const pool = require("../config")

router = express.Router()

router.post("/register", async function(req, res, next){
    console.log(req.body)
    const user = req.body.user
    const fname = req.body.fname;
    const lname = req.body.lname;
    const classes = req.body.classes;
    const no = req.body.no;
    const dob = req.body.dob;
    const address = req.body.address;
    const pass = req.body.pass;

    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try {
        let [check_user, _] = await conn.query(`SELECT member_user FROM members WHERE member_user = ?`,
        [user])
        if (check_user.length > 0){
            await conn.rollback()
            return res.status(409).json({ status: false, message: "รหัสนักเรียนนี้ถูกใช้แล้ว" })
        } else {
            let result = await conn.query(`INSERT INTO members (member_user, member_password, member_fname, member_lname, member_class, member_no, member_dob, member_address)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?);`, [user, pass, fname, lname, classes, no, dob, address])
        }
        res.status(200).json( {status: true, message: "สมัครสมาชิกสำเร็จ"} )
        await conn.commit()
    } catch (err) {
        await conn.rollback()
        return res.status(400).json(err)
    } finally {
        conn.release()
    }

})

exports.router = router