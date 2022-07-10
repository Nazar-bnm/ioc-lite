# ioc-lite
This is a lightweight IoC Container library which helps to keep inversion of control peinciple by using DI pattern for javascript/typescript projects,
heavily inspired by [libioc](https://www.npmjs.com/package/libioc)
It can be used in the browser as well as in node.js server code.

## Basic Usage:
Creationg ioc container:
```typescript
import IoCContainer from 'ioc-lite';

export const ioc = new IoCContainer();
```

Defining resources:
```typescript
  export class Logger {
    log(message) {
      process.stdout.write(message);
    }
  }

  export class HttpService {
    logger: ILogger;
    config: IConfig;

    // define which resources should be injected
    static $inject = ['logger', 'config'];

    constructor(logger: ILogger, config: IConfig) {
      this.logger = logger;
      this.config = config;
    }
  }

  export const config = { host: 'localhost', port: 8080 };
```

Registering resources:
```typescript
  import { ioc } from './ioc-container';
  import { Logger, HttpService } from './services';
  import { config } from './config';

  // you can register resources wherever you want by importing ioc container which we created above
  ioc.registerClass('logger', Logger);
  ioc.registerClass('http', HttpService);
  ioc.registerClass('config', config);
```

Resolving resources:
```typescript
const config = ioc.resolve('config');
  // will return { host: 'localhost', port: 8080 }

  const logger = ioc.resolve('logger');
  // will return instance of Logger

  const http = ioc.resolve('http');
  // will return instance of http service with injected logger and config resources
```
