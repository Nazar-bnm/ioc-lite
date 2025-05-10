export type _Class<T = any>= new (...args: any[]) => T;

export type ClassType<T> = _Class<T> & {
  $inject?: string[];
  $singleton?: boolean;
};

export type ResolveDependency = (x: string) => {};

export type InstanceTypeOrValue<T> = T extends _Class ? InstanceType<T> : T;
