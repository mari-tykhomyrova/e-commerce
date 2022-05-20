import { Module } from '@nestjs/common';
import { UsersShoppingPreferencesService } from './users-shopping-preferences.service';
import { UsersShoppingPreferencesController } from './users-shopping-preferences.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersShoppingPreferencesController],
  providers: [UsersShoppingPreferencesService],
  exports: [UsersShoppingPreferencesService],
})
export class UsersShoppingPreferencesModule {}
