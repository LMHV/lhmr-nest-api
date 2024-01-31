import { JsonObject } from "@prisma/client/runtime/library";

export class CreateSaleDTO {
  readonly userId: string;
  readonly products: JsonObject;
}

export class DeleteSaleDTO {
  readonly userId: string;
  readonly saleId: number;
}