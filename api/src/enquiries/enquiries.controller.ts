import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiServiceUnavailableResponse,
  ApiTags,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';
import { EnquiriesService } from './enquiries.service';
import { CreateEnquiryDto } from './dto/create-enquiry.dto';
import { RedisRateLimitGuard } from './redis-rate-limit.guard';

@ApiTags('Enquiries')
@UseGuards(RedisRateLimitGuard)
@Controller('enquiries')
export class EnquiriesController {
  constructor(private readonly enquiriesService: EnquiriesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Submit a marketing enquiry',
    description:
      'Validates an enquiry and emails it to the configured enquiry inbox.',
  })
  @ApiBody({ type: CreateEnquiryDto })
  @ApiBadRequestResponse({
    description: 'The request contains invalid fields.',
  })
  @ApiServiceUnavailableResponse({
    description: 'Enquiry delivery has not been configured.',
  })
  @ApiTooManyRequestsResponse({
    description: 'Too many enquiries submitted. Please try again later.',
  })
  @ApiInternalServerErrorResponse({
    description: 'The enquiry could not be delivered due to a server error.',
  })
  create(@Body() dto: CreateEnquiryDto) {
    return this.enquiriesService.create(dto);
  }
}
