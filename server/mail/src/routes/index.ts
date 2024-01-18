import { Router, Request, Response } from "express";
import nodemailer from "nodemailer";

const router = Router()

router.post('/', async (req: Request, res: Response) => {
    const details: {
        to: string,
        subject: string,
        content: string
    } = req?.body;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL_EMAIL,
            pass: process.env.MAIL_SECRET,
        },
    });

    if (details?.to && details?.subject && details?.content) {
        try {
            const done = await transporter.sendMail({
                from: `${process?.env?.TITLE} <${process.env.MAIL_EMAIL}>`,
                to: details?.to,
                subject: details?.subject,
                text: details?.content
            })

            res?.status(200).json({
                status: 200,
                message: "Success",
                data: done?.response
            })
        } catch (err) {
            res?.status(500)?.json({
                status: 500,
                message: "Email Send Failed"
            })
        }
    } else {
        res?.status(422)?.json({
            status: 422,
            message: "Wrong Mail Data"
        })
    }
})

export default router;