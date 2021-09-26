import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Flavor } from "./flavor.entity"

@Entity()// Entity significa que esto es una tabla
export class Coffee{
    @PrimaryGeneratedColumn()//clave primaria
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    brand: string;
  
    @JoinTable()
    @ManyToMany(
      type => Flavor,
      flavor => flavor.coffees,
      {
        cascade: true, 
      },
    )
    flavors: Flavor[];
  }