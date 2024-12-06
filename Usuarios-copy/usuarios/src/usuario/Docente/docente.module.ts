import { Module } from '@nestjs/common';
import { DocenteService } from './docente.service';
import { DocenteController } from './docente.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Docente, DocenteSchema } from './tschema/docente.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Docente.name, schema: DocenteSchema }])],
  controllers: [DocenteController],
  providers: [DocenteService],
})
export class DocenteModule {}
