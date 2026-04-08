import express from 'express'

import { login, logout } from '../controllers/PenggunaController.js'
import { refreshToken } from '../controllers/RefreshToken.js'
import { verifyToken } from '../middleware/VerifyToken.js'
import { getProperti, updateProperti, showProperti, createProperti } from '../controllers/PropertiController.js'
import { getKamar, showKamar, createKamar, updateKamar } from '../controllers/KamarController.js'
import { getPenyewa, showPenyewa, createPenyewa, updatePenyewa } from '../controllers/PenyewaController.js'
import { getSewa, showSewa, createSewa } from '../controllers/SewaController.js'
import { getTagihan, showTagihan, createTagihan } from '../controllers/TagihanController.js'
import { createPembayaran, getPembayaran, showPembayaran } from '../controllers/PembayaranController.js'
import { getProvinsi } from '../controllers/ProvinsiController.js'
import { getKabKota, showKabKota } from '../controllers/KabKotaController.js'
import { getKecamatan, showKecamatan } from '../controllers/KecamatanController.js'
import { getKelurahan, showKelurahan } from '../controllers/KelurahanController.js'
import { getStatusKamar } from '../controllers/StatusKamarController.js'
import { getPengenal } from '../controllers/Pengenal.js'
import { getStatusPernikahan } from '../controllers/StatusPernikahanController.js'
import { getJenisKelamin } from '../controllers/JenisKelaminController.js'

const router = express.Router()

// Authentikasi
router.post('/api/v1/login', login)
router.delete('/api/v1/logout', logout)
router.get('/api/v1/token', refreshToken)

// Provinsi
router.get('/api/v1/provinsi', verifyToken, getProvinsi)

// KabKota
router.get('/api/v1/kabkota', verifyToken, getKabKota)
router.get('/api/v1/kabkota/:id', verifyToken, showKabKota)

// Kecamatan
router.get('/api/v1/kecamatan', verifyToken, getKecamatan)
router.get('/api/v1/kecamatan/:id', verifyToken, showKecamatan)

// Kelurahan
router.get('/api/v1/kelurahan', verifyToken, getKelurahan)
router.get('/api/v1/kelurahan/:id', verifyToken, showKelurahan)

// Jenis Kelamin
router.get('/api/v1/jenis-kelamin', verifyToken, getJenisKelamin)

// Status Pernikahan
router.get('/api/v1/status-pernikahan', verifyToken, getStatusPernikahan)

// Pengenal
router.get('/api/v1/pengenal', verifyToken, getPengenal)

// Properti
router.get('/api/v1/properti', verifyToken, getProperti)
router.get('/api/v1/properti/:id', verifyToken, showProperti)
router.post('/api/v1/properti', verifyToken, createProperti)
router.patch('/api/v1/properti/:id', verifyToken, updateProperti)

// Kamar
router.get('/api/v1/kamar', verifyToken, getKamar)
router.get('/api/v1/kamar/:id', verifyToken, showKamar)
router.post('/api/v1/kamar', verifyToken, createKamar)
router.patch('/api/v1/kamar/:id', verifyToken, updateKamar)

// Status Kamar
router.get('/api/v1/status-kamar', verifyToken, getStatusKamar)

// Penyewa
router.get('/api/v1/penyewa', verifyToken, getPenyewa)
router.get('/api/v1/penyewa/:id', verifyToken, showPenyewa)
router.post('/api/v1/penyewa', verifyToken, createPenyewa)
router.patch('/api/v1/penyewa/:id', verifyToken, updatePenyewa)

// Sewa
router.get('/api/v1/sewa', verifyToken, getSewa)
router.get('/api/v1/sewa/:id', verifyToken, showSewa)
router.post('/api/v1/sewa', verifyToken, createSewa)

// Tagihan
router.get('/api/v1/tagihan', verifyToken, getTagihan)
router.get('/api/v1/tagihan/:id', verifyToken, showTagihan)
router.post('/api/v1/tagihan', verifyToken, createTagihan)

// Pembayaran
router.get('/api/v1/pembayaran', verifyToken, getPembayaran)
router.get('/api/v1/pembayaran/:id', verifyToken, showPembayaran)
router.post('/api/v1/pembayaran', verifyToken, createPembayaran)

export default router