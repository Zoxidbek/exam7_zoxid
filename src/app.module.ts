import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { StudentModule } from "./student/student.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { APP_PIPE } from "@nestjs/core";
import { ValidationPipe } from "./validation/validation.pipe";
import { ThrottlerModule } from "@nestjs/throttler";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "postgres",
      username: "postgres",
      password: "20080930",
      database: "exam_project",
      host: "localhost",
      port: 5432,
      autoLoadEntities: true,
      synchronize: true,
      logging: false,
    }),
    StudentModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    }
  ],
})
export class AppModule {}