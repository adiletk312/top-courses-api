import { Injectable } from '@nestjs/common';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TopPageModel } from './top-page.model';

@Injectable()
export class TopPageService {
  constructor(@InjectModel(TopPageModel) private readonly topPageModel: ModelType<TopPageModel>) {}

  async create(dto: CreateTopPageDto): Promise<DocumentType<TopPageModel>> {
    return this.topPageModel.create(dto);
  }

  async deleteById(id: string): Promise<DocumentType<TopPageModel> | null> {
    return this.topPageModel.findByIdAndDelete(id).exec();
  }

  async findById(id: string): Promise<DocumentType<TopPageModel> | null> {
    return this.topPageModel.findById(id).exec();
  }

  async findByAlias(alias: string): Promise<DocumentType<TopPageModel> | null> {
    return this.topPageModel.findOne({ alias }).exec();
  }

  async updateById(id: string, dto: CreateTopPageDto): Promise<DocumentType<TopPageModel> | null>  {
    return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async findByFirstCategory(dto: FindTopPageDto): Promise<DocumentType<TopPageModel>[]> {
    return this.topPageModel.find({ firstCategory: dto.firstCategory }, {
      alias: 1,
      secondCategory: 1,
      title: 1,
    }).exec();
  }
}
