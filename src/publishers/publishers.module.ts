import { Module } from '@nestjs/common';
import { PublishersService } from './publishers.service';
import { PublishersController } from './publishers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publisher } from './entities/publisher.entity';

@Module({

  controllers: [PublishersController],

  providers: [PublishersService],

  imports: [

    TypeOrmModule.forFeature([Publisher])
  ],

  exports: [PublishersService],
})
export class PublishersModule { }