import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator'

enum measurementTypes {
  uds = 'uds',
  mg = 'mg',
  g = 'g',
  kg = 'kg',
  tn = 'tn',
}


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
  @IsEnum([measurementTypes])
  measurementUnits: string;

  @IsNumber()
  @IsNotEmpty()
  stock: number;
}