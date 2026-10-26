import {
  Injectable,
  InternalServerErrorException,
  Logger,
  OnModuleInit,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

@Injectable()
export class MailService implements OnModuleInit {
  private readonly logger = new Logger(MailService.name);
  private transporter!: Transporter;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit(): void {
    const host = this.configService.get<string>('SMTP_HOST');
    const port = this.configService.get<number>('SMTP_PORT', 587);
    const secure = this.configService.get<string>('SMTP_SECURE') === 'true';
    const user = this.configService.get<string>('SMTP_USER');
    const pass = this.configService.get<string>('SMTP_PASS');

    if (!host || !user || !pass) {
      this.logger.warn(
        'SMTP is not configured. Email delivery will be unavailable.',
      );
      return;
    }

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });
  }

  async verifyConnection(): Promise<void> {
    if (!this.transporter) {
      throw new ServiceUnavailableException(
        'Email delivery is not configured.',
      );
    }

    try {
      await this.transporter.verify();
      this.logger.log('SMTP connection verified successfully.');
    } catch {
      this.logger.error('SMTP connection verification failed.');

      throw new ServiceUnavailableException(
        'Unable to connect to the email service.',
      );
    }
  }

  async sendMail(options: {
    to: string;
    subject: string;
    text: string;
    replyTo?: string;
  }): Promise<void> {
    if (!this.transporter) {
      throw new ServiceUnavailableException(
        'Email delivery is not configured.',
      );
    }

    const from = this.configService.get<string>('MAIL_FROM')?.trim();

    if (!from) {
      throw new ServiceUnavailableException(
        'The sender email address is not configured.',
      );
    }

    try {
      await this.transporter.sendMail({
        from,
        to: options.to,
        subject: options.subject,
        text: options.text,
        ...(options.replyTo ? { replyTo: options.replyTo } : {}),
      });
    } catch {
      this.logger.error('Failed to send email.');

      throw new InternalServerErrorException(
        'Unable to send the email at this time.',
      );
    }
  }
}
