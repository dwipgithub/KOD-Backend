import { penyewa, get, show  } from "../models/Penyewa.js"
import paginationDB from '../config/PaginationDB.js'
import * as response from '../helpers/response.js'
import { v4 as uuidv4 } from 'uuid'

export const getPenyewa = async (req, res) => {
    try {
        const results = await get(req)

        const paginationDBObject = new paginationDB(
            results.totalRowCount,
            results.page,
            results.limit,
            results.data
        )

        const pagination = paginationDBObject.getRemarkPagination()
                
        const message = results.data.length
            ? 'data found'
            : 'no data found'

        return response.success(
            res,
            results.data,
            message,
            pagination
        )
    } catch (err) {
        return response.error(res, err, 500)
    }
}

export const showPenyewa = async (req, res) => {
    try {
        const result = await show(req.params.id)

        if (!result) {
            return response.notFound(res, "resource not found")
        }

        return response.success(res, result, "data found")

    } catch (err) {
        return response.error(res, err, 500)
    }
}

export const createPenyewa = async (req, res) => {
    try {
        const uniqueKey = uuidv4()

        await penyewa.create({
            nama: req.body.nama,
            alamat: req.body.alamat,
            no_telp: req.body.noTelp,
            email: req.body.email,
            id_pengenal: req.body.idPengenal,
            no_pengenal: req.body.noPengenal,
            id_jenis_kelamin: req.body.idJenisKelamin,
            id_status_pernikahan: req.body.idStatusPernikahan,
            temp_key: uniqueKey
        })

        const data = await penyewa.findOne({
            where: { temp_key: uniqueKey }
        })

        return response.created(res, {
            id: data.id
        })
    } catch (err) {
        console.log("Gagal menyimpan properti:", err)
        return response.error(res, err, 500)
    }
}

export const updatePenyewa = async (req, res) => {
    try {
        // ======================
        // CEK DATA ADA / TIDAK
        // ======================
        const existing = await penyewa.findByPk(req.params.id)

        if (!existing) {
            return response.notFound(res, 'data not found')
        }

        // ======================
        // UPDATE DATA
        // ======================
        const [affectedRows] = await penyewa.update({
            nama: req.body.nama,
            alamat: req.body.alamat,
            no_telp: req.body.noTelp,
            email: req.body.email,
            id_pengenal: req.body.idPengenal,
            no_pengenal: req.body.noPengenal,
            id_jenis_kelamin: req.body.idJenisKelamin,
            id_status_pernikahan: req.body.idStatusPernikahan
        }, {
            where: { id: req.params.id }
        })

        // ======================
        // TIDAK ADA PERUBAHAN
        // ======================
        if (affectedRows === 0) {
            return response.success(res, null, 'no changes applied')
        }

        // ======================
        // SUCCESS
        // ======================
        return response.success(res, {
            id: req.params.id
        }, 'data updated successfully')

    } catch (err) {
        return response.error(res, err, 500)
    }
}