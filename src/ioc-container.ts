import DataResource from './resources/data.resource';
import ClassResource from './resources/class.resource';
import { ClassType } from './types';

export class IoCContainer {
  private _resources;

  constructor() {
    this._resources = new Map();
  }

  has(name: string) {
    return this._resources.has(name);
  }

  _resolveResourceDependency(resourceName: string, dependencyName: string) {
    if (this.has(dependencyName)) {
      return this._resources.get(dependencyName).resolve();
    }

    throw new Error(`Can't find dependency '${dependencyName}' for '${resourceName}' resource`);
  }

  _registerResource(name: string, entity: ClassType<unknown>, isClass?: boolean) {
    if (this.has(name)) {
      throw new Error(`${name} resource is already registered in the container!`);
    }

    let resource;

    if (isClass) {
      resource = new ClassResource(entity, this._resolveResourceDependency.bind(this, name));
    } else {
      resource = new DataResource(entity);
    }

    this._resources.set(name, resource);
  }

  register(name: string, entity: any) {
    this._registerResource(name, entity);

    return this;
  }

  registerClass(name: string, entity: any) {
    this._registerResource(name, entity, true);

    return this;
  }

  resolve(name: string) {
    if (this.has(name)) {
      return this._resources.get(name).resolve();
    }

    return null;
  }
}
