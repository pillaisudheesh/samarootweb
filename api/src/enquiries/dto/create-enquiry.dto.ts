import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';

export class CreateEnquiryDto {
  @ApiProperty({
    example: 'Alex Thomas',
    description: 'Name of the person submitting the enquiry.',
    maxLength: 100,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  @Matches(/\S/, { message: 'Name cannot be empty or whitespace only.' })
  name: string;

  @ApiProperty({
    example: 'alex@example.com',
    description: 'Contact email address.',
    maxLength: 254,
  })
  @IsEmail()
  @MaxLength(254)
  email: string;

  @ApiPropertyOptional({
    example: 'Sunrise Clinic',
    description: 'Clinic or organization name.',
    maxLength: 150,
  })
  @IsOptional()
  @IsString()
  @MaxLength(150)
  clinicName?: string;

  @ApiProperty({
    example: 'I would like to learn more about SamaRoot.',
    description:
      'Details of the enquiry. Do not include patient health information.',
    maxLength: 3000,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(3000)
  @Matches(/\S/, { message: 'Message cannot be empty or whitespace only.' })
  message: string;

  @ApiPropertyOptional({
    description: 'Anti-spam field. Leave empty.',
    maxLength: 200,
  })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  website?: string;
}
