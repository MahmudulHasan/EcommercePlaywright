import { setWorldConstructor, World } from '@cucumber/cucumber';

interface CustomWorld extends World {
  sharedData: Record<string, any>; // Object to store shared data
}

class MyWorld implements CustomWorld {
  sharedData: Record<string, any>;

  constructor() {
    this.sharedData = {};
  }
    attach;
    log;
    link;
    parameters: any;
}

setWorldConstructor(MyWorld);
export { CustomWorld };