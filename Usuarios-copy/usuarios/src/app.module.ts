import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { DocenteModule } from './usuario/Docente/docente.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [UsuarioModule,DocenteModule,MongooseModule.forRoot('mongodb+srv://Steven:Steven123@cluster0.lxqrtx8.mongodb.net/Exx'), UsuarioModule, DocenteModule ],
  controllers: [AppController],
  providers: [AppService],
})

 

export class AppModule {}
