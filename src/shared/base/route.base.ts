import * as express from 'express';

export abstract class BaseRoute {
  constructor(
    protected path: string,
    protected router: express.Router = express.Router(),
  ) {}

  public getRouter(): express.Router {
    return this.router;
  }

  protected abstract initializeRoutes(): void;
}
