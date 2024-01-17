import { type NextFunction, type Request, type Response } from "express";
import searchService from "src/services/search.service";
import { type RequestHandlerDto, catchAsync } from "src/utils/catchAsync";

const search: RequestHandlerDto = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const file = req.file;
    if (file === undefined) {
      const response = await searchService.searchBase64(req.body.image);
      res.json(response);
      return;
    }
    const response = await searchService.search(file);
    res.json(response);
  },
);

const searchController = {
  search,
};

export default searchController;
