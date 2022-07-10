import DataResource from './resources/data.resource';

export class IoCContainer {
  private _resources;

  constructor() {
    this._resources = new Map();
  }

  has(name: string) {
    return this._resources.has(name);
  }

  _registerResource(name: string, resource: DataResource) {
    this._resources.set(name, resource);
  }

  register(name: string, entity: any) {
    if (this.has(name)) {
      throw new Error(`${name} resource is already registered in the container!`);
    }

    const resource = new DataResource(entity);

    this._registerResource(name, resource);

    return this;
  }

  resolve(name: string) {
    if (this.has(name)) {
      return this._resources.get(name).resolve();
    }

    return null;
  }
}
