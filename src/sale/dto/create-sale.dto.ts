import { JsonObject } from "@prisma/client/runtime/library";
import { IsString, IsNotEmpty } from 'class-validator'

export class CreateSaleDTO {
  @IsString()
  @IsNotEmpty()
  readonly userId: string;
  @IsNotEmpty()
  readonly products: JsonObject;
}

