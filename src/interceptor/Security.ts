import { Express, Request, Response, NextFunction } from 'express';
 
// Your custom "middleware" function:
function preventCrossSiteScripting(req: Request, res: Response, next: NextFunction): void {
  res.setHeader('Ehlo', 'ISO8583');
  next();
}


function setApplicationStamp(req: Request, res: Response, next: NextFunction): void {
    res.setHeader("ApplicationName", "parkmansys")
    res.setHeader("ApplicationVersion", "1.0.0")
    next()
}
 
export function applyServerHardening(app: Express): void {
  // Make your Express app use your custom middleware:
  app.use(preventCrossSiteScripting);
  app.use(setApplicationStamp);
}