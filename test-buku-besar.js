import axios from 'axios'

const testBukuBesar = async () => {
    try {
        console.log('Testing Buku Besar API...')

        const response = await axios.get('http://localhost:5001/laporan-buku-besar', {
            params: {
                startDate: '2024-01-01',
                endDate: '2024-12-31'
            }
        })

        console.log('Response status:', response.status)
        console.log('Total akun:', response.data.data.totalAkun)
        console.log('Data length:', response.data.data.data.length)

        if (response.data.data.data.length > 0) {
            console.log('First account:', response.data.data.data[0].akun)
            console.log('Transactions count:', response.data.data.data[0].transaksi.length)
        }

    } catch (error) {
        console.error('Error:', error.message)
        if (error.response) {
            console.error('Response status:', error.response.status)
            console.error('Response data:', error.response.data)
        }
    }
}

testBukuBesar()