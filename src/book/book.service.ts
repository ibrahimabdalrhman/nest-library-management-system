import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './interfaces/book.interface';

@Injectable()
export class BookService {
  constructor(@InjectModel('Book') private readonly bookModel: Model<Book>) {}
  async create(createBookDto: CreateBookDto) {
    const book = await this.bookModel.create(createBookDto);
    return book;
  }

  async findAll() {
    const books = await this.bookModel.find().populate('author').exec();
    return books;
  }

  async findOne(id: string) {
    const book = await this.bookModel.findById(id).populate('author').exec();
    return book;
  }

  async update(id: string, updateBookDto: any): Promise<Book> {
    return this.bookModel
      .findByIdAndUpdate(id, updateBookDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<any> {
    return this.bookModel.findByIdAndDelete(id).exec();
  }
}
