import DataResource from './resources/data.resource';
import ClassResource from './resources/class.resource';
import { InstanceTypeOrValue } from './types';

export class IoCContainer<T extends Record<string, any>> {
  private _resources: T;

  constructor() {
    this._resources = new Map() as unknown as T;
  }

  has<K extends keyof T>(name: K) {
    return this._resources.has(name);
  }

  private _resolveResourceDependency<K extends keyof T>(resourceName: K, dependencyName: K) {
    if (this.has(dependencyName)) {
      return this._resources.get(dependencyName).resolve();
    }

    throw new Error(`Can't find dependency '${String(dependencyName)}' for '${String(resourceName)}' resource`);
  }

  private _registerResource<K extends keyof T>(name: K, resource: DataResource | ClassResource) {
    if (this.has(name)) {
      throw new Error(`${String(name)} resource is already registered in the container!`);
    }

    this._resources.set(name, resource);
  }

  register<K extends keyof T>(name: K, entity: T[K]) {
    const resource = new DataResource(entity);

    this._registerResource(name, resource);

    return this;
  }

  registerClass<K extends keyof T>(name: K, service: T[K]) {
    const resource = new ClassResource(service, this._resolveResourceDependency.bind(this, name));

    this._registerResource(name, resource);

    return this;
  }

  resolve<K extends keyof T>(name: K) {
    if (this.has(name)) {
      return this._resources.get(name).resolve() as InstanceTypeOrValue<T[K]>;
    }

    return null;
  }
}
