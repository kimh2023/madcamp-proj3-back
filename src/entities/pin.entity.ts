import { ObjectId } from "mongodb";
import { Column, Entity, ManyToOne, ObjectIdColumn } from "typeorm";

import { Board } from "./board.entity";
import { Product } from "./product.entity";

@Entity("tb_pins")
export class Pin {
  @ObjectIdColumn()
  _id: ObjectId;

  @ManyToOne(() => Product, (product) => product.pin)
  product: Product;

  @ManyToOne(() => Board, (board) => board.pin)
  board: Board;

  @Column()
  note: string;
}
