import { Module } from "@nestjs/common";
import { DatabaseConfig } from "./config/database-config";

@Module({
  imports: [],
  providers: [DatabaseConfig],
  exports: [DatabaseConfig],
})
export class DatabaseModule {}