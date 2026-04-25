import axios from "axios"

export const sendWhatsapp = async (target, message) => {
    try {

        const response = await axios.post(
            "https://api.fonnte.com/send",

            new URLSearchParams({
                target: target,
                message: message,
                countryCode: "62"
            }),

            {
                headers: {
                    Authorization: process.env.FONNTE_TOKEN,
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
        )

        console.log("WhatsApp sent:", response.data)

        return {
            success: true,
            data: response.data
        }

    } catch (error) {

        if (error.response) {

            console.error(
                "WhatsApp API Error:",
                error.response.data
            )

            return {
                success: false,
                error: error.response.data
            }

        }

        console.error(
            "WhatsApp Request Error:",
            error.message
        )

        return {
            success: false,
            error: error.message
        }
    }
}