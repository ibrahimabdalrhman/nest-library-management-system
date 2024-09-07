import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  NotFoundException,
  Res,
  Response,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/jwt/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesEnum } from 'src/user/enum/roles';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Multer } from 'multer'; // Import the Multer types
import { join } from 'path';

@ApiBearerAuth('access_token')
@ApiTags('categories')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Create a new book' })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get details of a books' })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get details of a category by ID' })
  @ApiParam({ name: 'id', description: 'ID of the category' })
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }
  @Get(':id/books')
  @ApiOperation({ summary: 'Get details of Books from category by ID' })
  @ApiParam({ name: 'id', description: 'ID of the category' })
  findBooksFromCategory(@Param('id') id: string) {
    return this.categoryService.findBooksFromCategory(id);
  }
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  @Patch(':id')
  @ApiOperation({ summary: 'update details of a category by ID' })
  @ApiParam({ name: 'id', description: 'ID of the category' })
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'delete category by ID' })
  @ApiParam({ name: 'id', description: 'ID of the category' })
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  @Post(':id/image')
  @ApiOperation({ summary: 'Upload an image for category' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/category-images',
        filename: (req, file, cb) => {
          // Use original filename or create a custom name
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + '-' + file.originalname);
        },
      }),
    }),
  )
  @ApiOperation({ summary: 'update image of category by ID' })
  @ApiParam({ name: 'id', description: 'ID of the category' })
  async uploadCategoryImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    return this.categoryService.uploadImage(file.path, id);
  }
}
