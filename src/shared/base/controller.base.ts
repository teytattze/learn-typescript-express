import * as express from 'express';

export abstract class BaseController {
  constructor(
    protected path: string,
    protected router: express.Router = express.Router(),
  ) {}

  public getRouter() {
    return this.router;
  }
}
