import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
const fs = require('fs');
const { parse } = require('path');
const urlPathGet = '/Users/mac/Downloads/SSH/new/'
const urlPathSave = '/Users/mac/Downloads/SSH/excel/'
const urlMailContent = '/Users/mac/Downloads/SSH/mailcontent/'
const simpleParser = require('mailparser').simpleParser;
let outputMail = {
    receiver: '',
    sender: '',
    subject: '',
    text: '',
    date: new Date(),
    attachments: []
}
@Injectable()
export class CronService {
    constructor() {}

    @Cron(CronExpression.EVERY_10_SECONDS)
    async runEveryMinutes() { 
        this.getMailContent();
    }
    
    getMailContent() {
        fs.readdirSync(urlPathGet).forEach(file => {
                const source = fs.readFileSync(`${urlPathGet}${file}`, 'utf8')
                simpleParser(source, (err, parsed) => {
                    if (err) return;
                    outputMail.sender = parsed.from ? parsed.from.text : ''
                    outputMail.receiver = parsed.to ? parsed.to.text : ''
                    outputMail.text = parsed.text
                    outputMail.subject = parsed.subject
                    outputMail.date = parsed.date
                    parsed.attachments.forEach(attachment => {
                        outputMail.attachments.push(attachment.filename)
                        let fileName = attachment.filename
                        fs.writeFileSync(urlPathSave + fileName, attachment.content);
                    })
                    let sliceName = outputMail.sender.split(/\s|<|>/).join('')
                    let nameSave = urlMailContent + sliceName + new Date().getTime() + '.txt'
                    fs.writeFileSync(nameSave, JSON.stringify(outputMail));
                    fs.unlinkSync(`${urlPathGet}${file}`)
                    console.log('done');
                });
                
        });
    
    }
}
