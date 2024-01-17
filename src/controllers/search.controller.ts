import { type NextFunction, type Request, type Response } from "express";
import searchService from "src/services/search.service";
import { type RequestHandlerDto, catchAsync } from "src/utils/catchAsync";

const search: RequestHandlerDto = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as any).user as number;
    const file = req.file;
    if (file === undefined) {
      console.log(req.body.image);
      res.status(400).json({ error: "No file uploaded" });
    } else {
      console.log("file");
      const response = await searchService.search(userId, file);
      res.json(response);
    }
  },
);

const searchController = {
  search,
};

export default searchController;
