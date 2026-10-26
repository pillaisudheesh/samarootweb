import { Module } from '@nestjs/common';
import { MailModule } from '../mail/mail.module';
import { EnquiriesController } from './enquiries.controller';
import { EnquiriesService } from './enquiries.service';
import { RedisRateLimitGuard } from './redis-rate-limit.guard';

@Module({
  imports: [MailModule],
  controllers: [EnquiriesController],
  providers: [EnquiriesService, RedisRateLimitGuard],
})
export class EnquiriesModule {}
