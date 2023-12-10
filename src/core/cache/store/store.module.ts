import { Module } from "@nestjs/common";
import { StoreConfig } from "./config/store-config";

@Module({
  imports: [],
  providers: [StoreConfig],
  exports: [StoreConfig],
})
export class StoreModule {}