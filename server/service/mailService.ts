import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer/index.js';
import logger from '../logger/logger';

class MailService {

    transporter: Mail
    
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "Yandex",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            }
        })
    }
    
    async sendActivationMail (to: string, link: string) {
        const activationLink = process.env.HOST_CLIENT + "/activate/" + link

        if (process.env.MAIL_ENABLED === 'false') {
            logger.info("Mail service disabled in dev", {to, activationLink})
            return
        }
        
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: "Account activation on " + process.env.HOST_CLIENT,
            text: '',
            html:
                `
                    <div>
                        <h1>Follow the link below to activate your account:</h1>
                        <a href="${activationLink}">Link: ${activationLink}</a>
                    </div>
                `
        })
    }

    async sendRecoveryMail (to: string, link: string) {
        const recoveryLink = process.env.HOST_CLIENT + "/recover/" + link

        if (process.env.MAIL_ENABLED === 'false') {
            logger.info("Mail service disabled in dev", {to, recoveryLink})
            return
        }

        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: "Password recover on " + process.env.HOST_CLIENT,
            text: '',
            html:
                `
                    <div>
                        <h1>Follow the link below to reset your password:</h1>
                        <a href="${recoveryLink}">Link: ${recoveryLink}</a>
                    </div>
                `
        })
    }

    async sendConfirmationCode (to: string, code: string) {

        if (process.env.MAIL_ENABLED === 'false') {
            logger.info("Mail service disabled in dev", {to, code})
            return
        }

        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: "Confirmation code",
            text: '',
            html:
                `
                    <div>
                        <h1>Here's your confirmation code on ${process.env.HOST_CLIENT}</h1>
                        <strong>${code}</strong>
                    </div>
                `
        })
    }

    async sendMailChangedMessage (to: string) {

        if (process.env.MAIL_ENABLED === 'false') {
            logger.info("Mail service disabled in dev", {to})
            return
        }

        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: "Email change on " + process.env.HOST_CLIENT,
            text: '',
            html:
                `
                    <div>
                        You've successfully changed your email
                    </div>
                `
        })
    }

    async sendMailChangeLink (to: string, link: string) {
        const changeLink = process.env.HOST_CLIENT + "/change-email/" + link

        if (process.env.MAIL_ENABLED === 'false') {
            logger.info("Mail service disabled in dev", {to, changeLink})
            return
        }

        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: "Email change on " + process.env.HOST_CLIENT,
            text: '',
            html:
                `
                    <div>
                        <h1>Follow the link below to change your email:</h1>
                        <a href="${link}">Link: ${link}</a>
                    </div>
                `
        })
    }
}

export default new MailService()