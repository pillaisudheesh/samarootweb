import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnquiriesModule } from './enquiries/enquiries.module';
import { MailModule } from './mail/mail.module';

function validateEnvironment(config: Record<string, unknown>) {
  if (config.NODE_ENV !== 'production') {
    return config;
  }

  const requiredVariables = [
    'FRONTEND_ORIGIN',
    'ENQUIRY_TO',
    'MAIL_FROM',
    'SMTP_HOST',
    'SMTP_USER',
    'SMTP_PASS',
  ];

  const missingVariables = requiredVariables.filter(
    (key) => typeof config[key] !== 'string' || !(config[key] as string).trim(),
  );

  if (missingVariables.length > 0) {
    throw new Error(
      `Missing required production environment variables: ${missingVariables.join(', ')}`,
    );
  }

  const smtpPort = Number(config.SMTP_PORT ?? 587);

  if (!Number.isInteger(smtpPort) || smtpPort < 1 || smtpPort > 65535) {
    throw new Error('SMTP_PORT must be a valid TCP port number.');
  }

  return {
    ...config,
    SMTP_PORT: smtpPort,
  };
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validate: validateEnvironment,
    }),

    EnquiriesModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
