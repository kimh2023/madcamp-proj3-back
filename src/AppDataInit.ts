import boardService from "./services/board.service";
import pinService from "./services/pin.service";
import userService from "./services/user.service";
import { type BoardRequestDto } from "./types/board.types";
import { type NewUserDto } from "./types/user.types";

const testUser1: NewUserDto = {
  email: "kimh2364@gmail.com",
  password: "00000000",
  isVerified: true,
};

const testBoard1: BoardRequestDto = {
  name: "board1",
};

const testPin1 = {
  note: "hi",
};

// const testProduct1: Partial<Product> = {
//   _id: 1,
//   name: "test1",
// };

export const initData = async () => {
  const userResponse = await userService.createUser(testUser1);
  if (userResponse.user?.id) {
    const boardResponse = await boardService.createBoard(
      userResponse.user?.id,
      {
        name: testBoard1.name,
        user: userResponse.user,
      },
    );

    if (boardResponse.board) {
      for (let i = 0; i < 10; i++) {
        await pinService.createPin(boardResponse.board.id, i * 10, {
          note: `hi${i}`,
        });
      }
    }
  }
  // await productService.createProduct(testProduct1);
};
