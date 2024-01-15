import { Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Pin } from "./pin.entity";
import { User } from "./user.entity";

@Entity("tb_boards")
export class Board {
  @PrimaryGeneratedColumn()
  _id: number;

  @OneToMany(() => Pin, (pin) => pin.board)
  pin: Pin[];

  @ManyToMany(() => User, (user) => user.board)
  user: User;
}
