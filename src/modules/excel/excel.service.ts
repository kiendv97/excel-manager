import { HttpService, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { findIndex } from 'rxjs-compat/operator/findIndex';
const FormData = require('form-data');
import { API_PROCESS_EXCEL } from '../../common/api/excel';
import { IInfo } from '../info/info.interface';
const fs = require('fs');
@Injectable()
export class ExcelService {
  private pathFolder: String = process.env.PATH_SAVER;
  private form: any = null;
  constructor(
    private httpSerive: HttpService,
    @InjectModel('info') private infoModel: Model<IInfo>,
  ) {}
  getFolderSaver(infoMail: IInfo) {
    let timeFile = `${new Date(infoMail.date).getMonth() + 1}${new Date(
      infoMail.date,
    ).getFullYear()}`;
    return `${this.pathFolder}/${timeFile}`;
  }
  async processExcel(id: String, fileIndex: any, sheetName: string): Promise<any> {
    let infoMail = await this.infoModel.findById(id);
    this.form = new FormData();
    this.form.append(
      'excel',
      fs.readFileSync(`${this.getFolderSaver(infoMail)}/${infoMail.attachments[fileIndex]}`),
      `${infoMail.sender}.xlsx`,
    );
    this.form.append('sheet', sheetName);
    this.form.append('discount', process.env.DISCOUNT_FIX);
    return this.httpSerive
      .post(API_PROCESS_EXCEL.URLPROCESSING, this.form, {
        headers: {
          accept: 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-Type': `multipart/form-data; boundary=${this.form._boundary}`,
        },
      })
      .toPromise()
      .then(res => {
        return res.data;
      })
      .catch(err => {
        console.log(err.response.data);
      });
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async getSheets(id: String, fileIndex: any): Promise<any> {
    let infoMail = await this.infoModel.findById(id);
    this.form = new FormData();
    this.form.append(
      'excel',
      fs.readFileSync(`${this.getFolderSaver(infoMail)}/${infoMail.attachments[fileIndex]}`),
      `${infoMail.sender}.xlsx`,
    );
    return this.httpSerive
      .post(API_PROCESS_EXCEL.URLSHEET, this.form, {
        headers: {
          accept: 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-Type': `multipart/form-data; boundary=${this.form._boundary}`,
        },
      })
      .toPromise()
      .then(res => {
        return res.data;
      })
      .catch(err => {
        console.log(err.response.data);
      });
  }
}
