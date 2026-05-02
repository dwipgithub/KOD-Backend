// Simple test to verify PDF can be sent correctly
import express from 'express'
import { generatePdfArusKas } from './helpers/generatePDF.js'

const app = express()

const testData = [
    {
        id: 1,
        tipe: 'Uang Masuk',
        nama: 'Test Payment',
        idTagihan: 101,
        tanggalBayar: new Date('2024-01-15'),
        totalBayar: 2000000,
        properti: { nama: 'Properti A' },
        kamar: { nama: 'Kamar 101' },
        penyewa: { nama: 'John Doe' },
        deskripsiTagihan: { nama: 'Test' }
    }
]

app.get('/test-pdf', async (req, res) => {
    try {
        console.log('Generating test PDF...')
        const pdfBuffer = await generatePdfArusKas(testData, {
            startDate: '2024-01-01',
            endDate: '2024-01-31'
        })
        
        console.log('PDF Buffer type:', typeof pdfBuffer)
        console.log('PDF Buffer size:', pdfBuffer.length)
        console.log('PDF Buffer instanceof Buffer:', Buffer.isBuffer(pdfBuffer))
        
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Length', pdfBuffer.length)
        res.setHeader('Content-Disposition', `attachment; filename="test.pdf"`)
        
        res.end(pdfBuffer)
        console.log('✅ PDF sent successfully')
    } catch (error) {
        console.error('❌ Error:', error.message)
        res.status(500).json({ error: error.message })
    }
})

app.listen(3333, () => {
    console.log('Test server running on http://localhost:3333')
    console.log('Test: curl http://localhost:3333/test-pdf > test-download.pdf')
})
