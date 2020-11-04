import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateInfoDto } from './dto/create-info.dto';
import { IInfo } from './info.interface';

@Injectable()
export class InfoService {
  constructor(@InjectModel('info') private infoModel: Model<IInfo>) {}
  async createInfo(createInfoDto: CreateInfoDto): Promise<IInfo> {
    const createdInfo = new this.infoModel(createInfoDto);
    return createdInfo.save();
  }

  async findAll(): Promise<IInfo[]> {
    return this.infoModel.find().exec();
  }
  async findOne(id: String): Promise<IInfo> {
    let info = await this.infoModel.findOne({ _id: id });
    if (info) {
      await this.infoModel.updateOne({ _id: id }, { readed: true });
    }
    return info;
  }
}
