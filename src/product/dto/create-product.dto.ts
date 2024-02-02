import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
export class CreateProductDTO {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  productName: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  measurementUnits: string;

  @IsNumber()
  @IsNotEmpty()
  stock: number;
}