import { get } from '../models/LaporanBukuBesar.js'
import * as response from '../helpers/response.js'

export const getLaporanBukuBesar = async (req, res) => {
    try {
        const results = await get(req)

        const message = results.data.length
            ? 'data found'
            : 'no data found'

        return response.success(
            res,
            results,
            message
        )

    } catch (err) {
        return response.error(res, err, 422)
    }
}