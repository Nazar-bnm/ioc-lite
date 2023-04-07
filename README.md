# ioc-lite
This is a lightweight IoC Container library which helps to keep inversion of control principle by using DI pattern for typescript/javascript projects, inspired by [libioc](https://www.npmjs.com/package/libioc).

It can be used in the browser as well as in node.js code.

Supporting resource type checking with TypeScript Generics.

## Basic Usage:
Creating ioc container:
```typescript
import IoCContainer from 'ioc-lite';
import { Logger, HttpService, IConfig } from './services';

type IoCResources = {
  config: IConfig;
  logger: typeof Logger;
  http: typeof HttpService;
}

export const ioc = new IoCContainer<IoCResources>();
```

Example of defining resources and types:
```typescript
export interface IConfig {
  host: string;
  port: number;
}

export const config: IConfig= { host: 'localhost', port: 8080 };

export class Logger {
  log(message) {
    process.stdout.write(message);
  }
}

export class HttpService {
  logger: ILogger;
  config: IConfig;

  // define which dependencies should be injected
  static $inject = ['logger', 'config'];

  constructor(logger: ILogger, config: IConfig) {
    this.logger = logger;
    this.config = config;
  }
}
```

Registering resources:
```typescript
import { ioc } from './ioc-container';
import { Logger, HttpService } from './services';
import { config } from './config';

// you can register resources wherever you want by importing ioc container which we created above
ioc.registerClass('logger', Logger);
ioc.registerClass('http', HttpService);
ioc.register('config', config);
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

Resource type checking:
```typescript
// Typescript does not allow us to register the wrong resource:
ioc.registerClass('logger', HttpService); // -> Argument of type 'typeof HttpService' is not assignable to parameter of type 'typeof Logger'.

// Typescript does not allow us to resolve unexisting resource:
ioc.resolve('UnregisterClass'); // Argument of type '"UnregisterClass"' is not assignable to parameter of type 'keyof IoCResources'.'
```