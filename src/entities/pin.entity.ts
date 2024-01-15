import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Board } from "./board.entity";
import { Product } from "./product.entity";

@Entity("tb_pins")
export class Pin {
  @PrimaryGeneratedColumn()
  _id: number;

  @ManyToOne(() => Product, (product) => product.pins, { onDelete: "CASCADE" })
  product: Product;

  @ManyToOne(() => Board, (board) => board.pins, { onDelete: "CASCADE" })
  board: Board;

  @Column()
  note: string;
}
