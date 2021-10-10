import { IsString } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';
export class CreateCoffeeDto {

    @ApiProperty({description:"Coffees names"})
    @IsString()
    readonly name:string


    @ApiProperty({description:"Coffees brand"})
    @IsString()
    readonly brand:string

    

    @ApiProperty({example:[]})
    @IsString({ each: true }) //El {each:true} indica que es un array
    readonly flavors:string[]
}
/* function ApiProperty() {
    throw new Error("Function not implemented.")
}
 */
