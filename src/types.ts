export type _Class<T>= new (...args: any[]) => T;

export type ClassType<T> =  _Class<T> & {
  $inject?: string[];
};

export type ResolveDependency = (x: string) => {};
