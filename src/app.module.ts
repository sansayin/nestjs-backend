import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

import { ConfigModule } from '@nestjs/config';
import { CacheModule, Module } from "@nestjs/common";
import * as redisStore from "cache-manager-redis-store";
import type { RedisClientOptions } from "redis";

@Module({
  imports: [UsersModule, AuthModule, ConfigModule.forRoot(),
    CacheModule.register<RedisClientOptions>({
    isGlobal: true,
    store: redisStore,
    url: process.env.REDIS_URI,
    //no_ready_check: true, // new property
  })

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
