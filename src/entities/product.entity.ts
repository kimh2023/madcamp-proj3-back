import { IsUrl } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Pin } from "./pin.entity";

@Entity("tb_products")
export class Product {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  rating: number;

  @Column()
  @IsUrl()
  image: string;

  @Column()
  @IsUrl()
  link: string;

  @OneToMany(() => Pin, (pin) => pin.product, { onDelete: "CASCADE" })
  pins: Pin[];
}
