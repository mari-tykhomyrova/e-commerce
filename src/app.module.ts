import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { MailModule } from './mail/mail.module';
import { UsersShoppingPreferencesModule } from './users-shopping-preferences/users-shopping-preferences.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    MailModule,

    AuthModule,
    UsersModule,
    UsersShoppingPreferencesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
