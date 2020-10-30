import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilePathDto } from './dto/create-filepath.dto';
import { IFilepath } from './filepath.interface'

@Injectable()
export class FilepathService {
    constructor(@InjectModel('filepath') private filepathModel: Model<IFilepath>) { }

    async create(createFilePath: FilePathDto): Promise<IFilepath> {
        const filePath = new this.filepathModel(createFilePath);
        return filePath.save();
    }

    async findAll(): Promise<IFilepath[]> {
        return this.filepathModel.find().exec();
    }
}

