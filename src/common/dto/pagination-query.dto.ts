import { IsOptional, IsPositive } from "class-validator";

export class PaginationQueryDto {

constructor(){}


@IsOptional()
@IsPositive()
limit: number;

@IsOptional()
@IsPositive()
offset: number;


}
