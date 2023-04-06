import DataResource from './resources/data.resource';
import ClassResource from './resources/class.resource';

export class IoCContainer<T extends Record<string, any>> {
  private _resources: T;

  constructor() {
    this._resources = new Map() as unknown as T;
  }

  has<K extends keyof T>(name: K) {
    return this._resources.has(name);
  }

  _resolveResourceDependency<K extends keyof T>(resourceName: K, dependencyName: K) {
    if (this.has(dependencyName)) {
      return this._resources.get(dependencyName).resolve();
    }

    throw new Error(`Can't find dependency '${String(dependencyName)}' for '${String(resourceName)}' resource`);
  }

  _registerResource<K extends keyof T>(name: K, entity: T[K], isClass?: boolean) {
    if (this.has(name)) {
      throw new Error(`${String(name)} resource is already registered in the container!`);
    }

    let resource;

    if (isClass) {
      resource = new ClassResource(entity, this._resolveResourceDependency.bind(this, name));
    } else {
      resource = new DataResource(entity);
    }

    this._resources.set(name, resource);
  }

  register<K extends keyof T>(name: K, entity: T[K]) {
    this._registerResource(name, entity);

    return this;
  }

  registerClass<K extends keyof T>(name: K, service: T[K]) {
    this._registerResource(name, service, true);

    return this;
  }

  resolve<K extends keyof T>(name: K) {
    if (this.has(name)) {
      return this._resources.get(name).resolve();
    }

    return null;
  }
}
