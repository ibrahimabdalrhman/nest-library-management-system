import { PartialType } from '@nestjs/swagger';
import { BorrowingDto } from './create-borrowing.dto';

export class UpdateBorrowingDto extends PartialType(BorrowingDto) {}
