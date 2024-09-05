import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { privateDecrypt } from 'crypto';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {

  constructor(@InjectModel('Category') private readonly categoryModel:Model<CreateCategoryDto>){}
  
 
  async create(createAuthorDto: any): Promise<CreateCategoryDto> {

    const newAuthor = new this.categoryModel(createAuthorDto);
    return newAuthor.save();
  }

  async findAll(): Promise<CreateCategoryDto[]> {
    return this.categoryModel.find().exec();
  }

  async findOne(id: string): Promise<CreateCategoryDto> {
    return this.categoryModel.findById(id).exec();
  }

  async update(id: string, updateCategoryDto: any): Promise<CreateCategoryDto> {
    return this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, { new: true }).exec();
  }

  async remove(id: string): Promise<any> {
    return this.categoryModel.findByIdAndDelete(id).exec();
  }
}
