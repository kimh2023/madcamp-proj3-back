import { IsUrl } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Pin } from "./pin.entity";

@Entity("tb_products")
export class Product {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  name: string;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  price: number;

  @Column({ type: "decimal", precision: 10, scale: 1, default: 0 })
  rating: number;

  @Column({
    default:
      "https://i.pinimg.com/564x/20/4e/90/204e905bfc7f55c45f3a0eeddc2431c9.jpg",
  })
  @IsUrl()
  image: string;

  @Column({ nullable: true })
  @IsUrl()
  link: string;

  @OneToMany(() => Pin, (pin) => pin.product, { onDelete: "CASCADE" })
  pins: Pin[];
}
