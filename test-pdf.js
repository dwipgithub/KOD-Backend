import { generatePdfArusKas } from './helpers/generatePDF.js'
import fs from 'fs'

const testData = [
    {
        id: 1,
        tipe: 'Uang Masuk',
        nama: 'Pembayaran Sewa',
        idTagihan: 101,
        tanggalBayar: new Date('2024-01-15'),
        totalBayar: 2000000,
        properti: { nama: 'Properti A' },
        kamar: { nama: 'Kamar 101' },
        penyewa: { nama: 'John Doe' },
        deskripsiTagihan: { nama: 'Sewa Bulanan' }
    },
    {
        id: 2,
        tipe: 'Uang Keluar',
        nama: 'Biaya Maintenance',
        idTagihan: null,
        tanggalBayar: new Date('2024-01-16'),
        totalBayar: 500000,
        properti: { nama: 'Properti A' },
        kamar: { nama: 'Kamar 101' },
        penyewa: null,
        deskripsiTagihan: { nama: 'Perbaikan' }
    }
]

const testFilters = {
    startDate: '2024-01-01',
    endDate: '2024-01-31'
}

console.log('Starting PDF generation test...')
console.log('Test data:', testData.length, 'records')

try {
    const pdfBuffer = await generatePdfArusKas(testData, testFilters)
    console.log('✅ PDF generated successfully!')
    console.log('PDF size:', pdfBuffer.length, 'bytes')
    
    // Save to file for testing
    fs.writeFileSync('./test-output.pdf', pdfBuffer)
    console.log('✅ PDF saved to test-output.pdf')
} catch (error) {
    console.error('❌ Error generating PDF:')
    console.error('Message:', error.message)
    console.error('Stack:', error.stack)
    process.exit(1)
}
