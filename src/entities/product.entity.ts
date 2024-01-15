import { IsUrl } from "class-validator";
import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn, OneToMany } from "typeorm";

import { Pin } from "./pin.entity";

@Entity("tb_products")
export class Product {
  @ObjectIdColumn()
  _id: ObjectId;

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

  @OneToMany(() => Pin, (pin) => pin.product)
  pin: Pin[];
}
