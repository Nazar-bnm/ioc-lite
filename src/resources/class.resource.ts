import { ClassType, ResolveDependency } from '../types';

export default class ClassResource {
  private _resource;
  private _resolveDependency;
  private _dependencies: string[];
  private _cache: unknown = null;
  private _singleton: boolean;

  constructor(resource: ClassType<unknown>, resolveDependency: ResolveDependency) {
    this._resource = resource;
    this._resolveDependency = resolveDependency;
    this._dependencies = resource.$inject || [];
    this._singleton = typeof(resource.$singleton) === 'boolean' ? resource.$singleton : false;
  }

  private _resolveDependencies() {
    return this._dependencies.map(this._resolveDependency);
  }

  resolve() {
    if (this._cache && this._singleton) {
      return this._cache;
    }

    const dependencies = this._resolveDependencies();
    const resource = new this._resource(...dependencies);

    if (this._singleton) {
      this._cache = resource;
    }

    return resource;
  }
}
