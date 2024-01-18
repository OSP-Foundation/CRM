import axios from "axios";

const sendMail = (details: {
    to: string,
    subject: string,
    content: string
}) => {
    return new Promise<void>(async (resolve, reject) => {
        if (process?.env?.MAIL_SERVER) {
            try {
                await axios.post(process?.env?.MAIL_SERVER, details)

                resolve()
            } catch (err: any) {
                reject({
                    status: err?.response?.status ? err?.response?.status : 500,
                    message: err?.response?.data?.message
                })
            }
        } else {
            reject({
                status: 500,
                message: "Wrong Mail Server"
            })
        }
    })
}

export default sendMail