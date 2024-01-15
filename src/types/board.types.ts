import { type Board } from "src/entities/board.entity";
import { type Pin } from "src/entities/pin.entity";

export interface BoardResponseDto {
  success: boolean;
  message: string;
  board?: Partial<Board>;
  pins?: Array<Partial<Pin>>;
}
