import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Pin } from "./pin.entity";
import { User } from "./user.entity";

@Entity("tb_boards")
export class Board {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column({ default: "" })
  name: string;

  @OneToMany(() => Pin, (pin) => pin.board, { onDelete: "CASCADE" })
  pins: Pin[];

  @ManyToOne(() => User, (user) => user.boards, { onDelete: "CASCADE" })
  @JoinColumn({ name: "_id" })
  user: User;
}
