import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InfoService } from '../info/info.service';
const fs = require('fs');
import { IInfoMail } from './cron.interface';
import { CreateInfoDto } from '../info/dto/create-info.dto';
import { simpleParser } from 'mailparser';
const md5 = require('md5');
@Injectable()
export class CronService {
  public urlPathGet: any = process.env.PATH_EMAILNEW;
  public urlPathSave: String = process.env.PATH_SAVER;
  public urlMailContent: String = process.env.PATH_INFO;
  constructor(private infoService: InfoService) {}

  @Cron(CronExpression.EVERY_10_MINUTES, { name: `${new Date()}` })
  async getMailContent() {
    let files = fs.readdirSync(this.urlPathGet);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const source = fs.readFileSync(`${this.urlPathGet}${file}`, 'utf8');
      simpleParser(source, async (err, parsed) => {
        let outputMail: IInfoMail = {
          sender: '',
          receiver: '',
          text: '',
          subject: '',
          date: '',
          attachments: [],
        };
        if (err) return;
        outputMail.sender = parsed.from?.value[0]?.address || '';
        outputMail.receiver = parsed.to?.text || '';
        outputMail.text = parsed.text;
        outputMail.subject = parsed.subject;
        outputMail.date = parsed.date;
        for (let att = 0; att < parsed.attachments.length; att++) {
          const attachment = parsed.attachments[att];
          outputMail.attachments.push(`${md5(parsed.date)}.xlsx`);
          let timeFile = `${new Date(parsed.date).getMonth() + 1}${new Date(
            parsed.date,
          ).getFullYear()}`;
          let folder = `${this.urlPathSave}/${timeFile}`;
          if (!fs.existsSync(folder)) fs.mkdirSync(folder);
          fs.writeFileSync(
            `${folder}/${md5(parsed.date)}.xlsx`,
            attachment.content,
          );
        }
        // Lưu vào db đường dẫn và text
        await this.infoService.createInfo(this.builderInfoDto(outputMail));
        fs.unlinkSync(`${this.urlPathGet}${file}`);
        console.log('done');
      });
    }
  }
  builderInfoDto(info: IInfoMail): CreateInfoDto {
    let builder: CreateInfoDto = {
      sender: '',
      receiver: '',
      text: '',
      subject: '',
      date: '',
      attachments: [],
    };
    builder.sender = info.sender;
    builder.receiver = info.receiver;
    builder.text = info.text;
    builder.subject = info.subject;
    builder.attachments = info.attachments;
    builder.date = info.date;
    return builder;
  }
}
