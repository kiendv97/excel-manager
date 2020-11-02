export interface IInfoMail {
    receiver: String
    sender: String
    subject: String
    text: String
    date: Date
    attachments: Array<Object>
}
