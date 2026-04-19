import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: '電子郵件', example: 'user@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ description: '密碼', example: 'password123' })
  @IsString()
  @MinLength(6)
  password!: string;
}