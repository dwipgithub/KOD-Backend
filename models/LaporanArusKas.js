import { DataTypes, QueryTypes } from "sequelize"
import { database } from "../config/Database.js"
import { privateFileUrl } from "../helpers/privateFileUrl.js"

export const get = async (req) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) > 100 ? 100 : parseInt(req.query.limit) || 100
        const offset = (page - 1) * limit

        // ======================
        // SELECT
        // ======================
        const sqlSelect = `
            SELECT 
            p.id,
            p.id_tagihan,
            p.tanggal_bayar as tanggal_bayar,
            p.total_bayar,
            p.id_metode_bayar,
            p.bukti_bayar,
            s.id_kamar,
            s.id_penyewa,
            k.nama AS nama_kamar,
            pi.id AS id_properti,
            pi.nama AS nama_properti,
            pe.nama AS nama_penyewa,
            mb.nama AS nama_metode_bayar,
            dt.id as id_deskripsi_tagihan,
            dt.nama as nama_deskripsi_tagihan
        `

        const sqlFrom = `
            FROM pembayaran p
            JOIN tagihan t ON p.id_tagihan = t.id
            JOIN deskripsi_tagihan dt ON t.id_deskripsi_tagihan = dt.id
            JOIN sewa s ON t.id_sewa = s.id
            JOIN kamar k ON s.id_kamar = k.id
            JOIN properti pi ON k.id_properti = pi.id
            JOIN penyewa pe ON s.id_penyewa = pe.id
            JOIN metode_bayar mb ON p.id_metode_bayar = mb.id
        `

        const sqlOrder = ` ORDER BY p.tanggal_bayar DESC `
        const sqlLimit = ' LIMIT ? '
        const sqlOffset = ' OFFSET ? '

        // ======================
        // FILTER
        // ======================
        const filters = []
        const replacements = []

        const { id_tagihan,  startDate, endDate } = req.query

        if (id_tagihan) {
            filters.push('p.id_tagihan = ?')
            replacements.push(id_tagihan)
        }

        // FILTER PERIODE ARUS KAS
        if (startDate && endDate) {
            filters.push('DATE(p.tanggal_bayar) BETWEEN ? AND ?')
            replacements.push(startDate, endDate)
        } else if (startDate) {
            filters.push('DATE(p.tanggal_bayar) >= ?')
            replacements.push(startDate)
        } else if (endDate) {
            filters.push('DATE(p.tanggal_bayar) <= ?')
            replacements.push(endDate)
        }

        const sqlWhere = filters.length > 0 ? ' WHERE ' + filters.join(' AND ') : ''
        const sqlQuery = sqlSelect + sqlFrom + sqlWhere + sqlOrder + sqlLimit + sqlOffset

        // ======================
        // QUERY DATA
        // ======================
        const result = await database.query(sqlQuery, {
            replacements: [...replacements, limit, offset],
            type: QueryTypes.SELECT
        })

        // ======================
        // FORMAT DATA
        // ======================
        const formattedData = result.map(item => ({
            id: item.id,
            tipe: 'Uang Masuk',
            idTagihan: item.id_tagihan,
            tanggalBayar: item.tanggal_bayar,
            totalBayar: item.total_bayar,
            deskripsiTagihan: {
                id: item.id_deskripsi_tagihan,
                nama: item.nama_deskripsi_tagihan
            },
            metodeBayar: {
                id: item.id_metode_bayar,
                nama: item.nama_metode_bayar
            },
            kamar: {
                id: item.id_kamar,
                nama: item.nama_kamar
            },
            properti: {
                id: item.id_properti,
                nama: item.nama_properti
            },
            penyewa: {
                id: item.id_penyewa,
                nama: item.nama_penyewa
            }
        }))

        // ======================
        // HITUNG TOTAL ROW
        // ======================
        const sqlCount = `
            SELECT COUNT(*) AS totalRowCount
            ${sqlFrom}
            ${sqlWhere}
        `
        const countResult = await database.query(sqlCount, {
            replacements,
            type: QueryTypes.SELECT
        })
        const totalRowCount = countResult[0].totalRowCount

        return {
            totalRowCount,
            page,
            limit,
            data: formattedData
        }

    } catch (error) {
        throw error
    }
}