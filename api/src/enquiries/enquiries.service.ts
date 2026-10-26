import {
  Injectable,
  InternalServerErrorException,
  Logger,
  ServiceUnavailableException,
  HttpException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateEnquiryDto } from './dto/create-enquiry.dto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class EnquiriesService {
  private readonly logger = new Logger(EnquiriesService.name);

  constructor(
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {}

  async create(dto: CreateEnquiryDto) {
    if (dto.website?.trim()) {
      return {
        success: true,
        message: 'Your enquiry has been submitted successfully.',
      };
    }

    const recipient = this.configService.get<string>('ENQUIRY_TO')?.trim();

    if (!recipient) {
      throw new ServiceUnavailableException(
        'Enquiry email delivery is not configured.',
      );
    }

    const message = [
      'A new enquiry was submitted through the SamaRoot website.',
      '',
      `Name: ${dto.name.trim()}`,
      `Email: ${dto.email.trim()}`,
      `Clinic / Organization: ${dto.clinicName?.trim() || 'Not provided'}`,
      '',
      'Message:',
      dto.message.trim(),
    ].join('\n');

    try {
      await this.mailService.sendMail({
        to: recipient,
        subject: 'New enquiry from the SamaRoot website',
        text: message,
        replyTo: dto.email.trim(),
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      this.logger.error('Failed to deliver a website enquiry email.');

      throw new InternalServerErrorException(
        'We could not submit your enquiry right now. Please try again later.',
      );
    }

    return {
      success: true,
      message: 'Your enquiry has been submitted successfully.',
    };
  }
}
