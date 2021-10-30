const express = require("express")
const path = require("path")
const pool = require("../config")

router = express.Router()

router.get("/user", async function(req, res, next){
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try {
        let [result, _] = await conn.query(`SELECT * FROM members ORDER BY member_id ASC;`)
        res.status(200).json(result)
        await conn.commit()
    } catch (err) {
        await conn.rollback()
        return res.status(400).json(err)
    } finally {
        conn.release()
    }

})

exports.router = router