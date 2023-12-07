import { validate } from "class-validator";
import { InvalidConfigException } from "./exceptions/invalid-config.exception";

export abstract class ModuleConfig {
  async validate() {
    const errors = await validate(this);

    if (errors.length) {
      throw new InvalidConfigException(errors[0].toString());
    }
  }
}