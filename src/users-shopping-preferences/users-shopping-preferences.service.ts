import { Injectable } from '@nestjs/common';
import { CreateUsersShoppingPreferenceDto } from './dto/create-users-shopping-preference.dto';
import { PrismaService } from '../database/prisma.service';
import { RemoveUsersShoppingPreferenceDto } from './dto/remove-users-shopping-preference.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersShoppingPreferencesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUsersShoppingPreferenceDto, userId: number) {
    // check if such preferences existed
    const existing = await this.findAll({
      shoppingPreferenceId: {
        in: data.shoppingPreferenceIds.map((id) => Number(id)),
      },
      userId,
    });
    // create new ones
    const newData = data.shoppingPreferenceIds
      .map((id) => {
        if (!existing.find((sh) => sh.shoppingPreferenceId === Number(id))) {
          return {
            shoppingPreferenceId: Number(id),
            userId,
          };
        }
      })
      .filter((sh) => sh);

    return !!(await this.prisma.usersOnShoppingPreference.createMany({
      data: newData,
      skipDuplicates: true,
    }));
  }

  findAll(whereParams: Prisma.UsersOnShoppingPreferenceWhereInput) {
    return this.prisma.usersOnShoppingPreference.findMany({
      where: whereParams,
    });
  }

  async remove(data: RemoveUsersShoppingPreferenceDto) {
    const newData = data.usersShoppingPreferenceIds.map((id) => Number(id));

    return !!(await this.prisma.usersOnShoppingPreference.deleteMany({
      where: {
        id: { in: newData },
      },
    }));
  }
}
