import { ClassType, ResolveDependency } from '../types';

export default class ClassResource {
  private _resource;
  private _resolveDependency;
  private _dependencies: string[];

  constructor(resource: ClassType<unknown>, resolveDependency: ResolveDependency) {
    this._resource = resource;
    this._resolveDependency = resolveDependency;
    this._dependencies = resource.$inject || [];
  }

  _resolveDependencies() {
    return this._dependencies.map(this._resolveDependency);
  }

  resolve() {
    const dependencies = this._resolveDependencies();

    return new this._resource(dependencies);
  }
}
