import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorService {
  constructor(@InjectModel('Author') private readonly authorModel: Model<Author>) {}

  async create(createAuthorDto: any): Promise<Author> {
    const newAuthor = new this.authorModel(createAuthorDto);
    return newAuthor.save();
  }

  async findAll(): Promise<Author[]> {
    return this.authorModel.find().exec();
  }

  async findOne(id: string): Promise<Author> {
    return this.authorModel.findById(id).exec();
  }

  async update(id: string, updateAuthorDto: any): Promise<Author> {
    return this.authorModel.findByIdAndUpdate(id, updateAuthorDto, { new: true }).exec();
  }

  async remove(id: string): Promise<any> {
    return this.authorModel.findByIdAndDelete(id).exec();
  }
}
