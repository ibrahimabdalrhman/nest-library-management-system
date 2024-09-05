import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
@ApiTags('authors')
@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  @ApiOperation({ summary: 'create new author ' })
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorService.create(createAuthorDto);
  }

  @Get()
  @ApiOperation({ summary: 'get authors' })
  findAll() {
    return this.authorService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'get author by ID' })
  @ApiParam({ name: 'id', description: 'ID of the author' })
  findOne(@Param('id') id: string) {
    return this.authorService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update author by ID' })
  @ApiParam({ name: 'id', description: 'ID of the author' })
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorService.update(id, updateAuthorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete author by ID' })
  @ApiParam({ name: 'id', description: 'ID of the author' })
  remove(@Param('id') id: string): Promise<any> {
    return this.authorService.remove(id);
  }
}
