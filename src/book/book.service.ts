import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthorService } from 'src/author/author.service';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class BookService {
  constructor(
    @InjectModel('Book') private readonly bookModel: Model<CreateBookDto>,
    private readonly authorService: AuthorService,
    private readonly categoryService: CategoryService,
  ) {}
  async create(createBookDto: CreateBookDto) {
    const author = await this.authorService.findOne(createBookDto.author_id);
    if (!author) {
      throw new NotFoundException(
        `Author with ID ${createBookDto.author_id} not found`,
      );
    }
    const category = await this.categoryService.findOne(
      createBookDto.category_id,
    );
    if (!category) {
      throw new NotFoundException(
        `Category with ID ${createBookDto.category_id} not found`,
      );
    }
    const book = await this.bookModel.create(createBookDto);
    return book;
  }

  async findAll() {
    const books = await this.bookModel.find().populate('author_id category_id').exec();
    return books;
  }

  async findOne(id: string) {
    const book = await this.bookModel.findById(id).populate('author_id category_id').exec();
    return book;
  }

  async update(id: string, updateBookDto: any): Promise<UpdateBookDto> {
    if (updateBookDto.author_id) {
      const author = await this.authorService.findOne(updateBookDto.author_id);
      if (!author) {
        throw new NotFoundException(
          `Author with ID ${updateBookDto.author_id} not found`,
        );
      }
    }
    if (updateBookDto.category_id) {
      const category = await this.categoryService.findOne(
        updateBookDto.category_id,
      );
      if (!category) {
        throw new NotFoundException(
          `Category with ID ${updateBookDto.category_id} not found`,
        );
      }
    }
    return this.bookModel
      .findByIdAndUpdate(id, updateBookDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<any> {
    return this.bookModel.findByIdAndDelete(id).exec();
  }
}
