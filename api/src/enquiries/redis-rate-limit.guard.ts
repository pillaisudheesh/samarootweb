import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import type { Request } from 'express';

@Injectable()
export class RedisRateLimitGuard implements CanActivate {
  private readonly logger = new Logger(RedisRateLimitGuard.name);
  private readonly rateLimiter: Ratelimit;

  constructor(configService: ConfigService) {
    const url = configService.get<string>('UPSTASH_REDIS_REST_URL')?.trim();

    const token = configService.get<string>('UPSTASH_REDIS_REST_TOKEN')?.trim();

    if (!url || !token) {
      throw new Error(
        'Upstash Redis REST configuration is required for rate limiting.',
      );
    }

    const redis = new Redis({ url, token });

    this.rateLimiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '60 s'),
      prefix: 'samaroot:enquiries',
      analytics: false,
    });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    // Prefer the platform-provided client IP; fall back to Express.
    const realIpHeader = request.headers['x-real-ip'];
    const realIp = Array.isArray(realIpHeader) ? realIpHeader[0] : realIpHeader;

    const ip = realIp?.trim() || request.ip || 'unknown';

    try {
      const result = await this.rateLimiter.limit(`ip:${ip}`);

      if (!result.success) {
        throw new HttpException(
          'Too many enquiries submitted. Please wait before trying again.',
          HttpStatus.TOO_MANY_REQUESTS,
        );
      }

      return true;
    } catch (error) {
      if (
        error instanceof HttpException &&
        error.getStatus() === HttpStatus.TOO_MANY_REQUESTS
      ) {
        throw error;
      }

      this.logger.error(
        'Rate-limit service is unavailable. Enquiry request blocked.',
      );

      throw new ServiceUnavailableException(
        'Enquiry submission is temporarily unavailable. Please try again later.',
      );
    }
  }
}
