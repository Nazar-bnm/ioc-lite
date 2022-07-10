class DataResource {
  private _resource;

  constructor(resource: any) {
    this._resource = resource;
  }

  resolve() {
    return this._resource;
  }
}

export default DataResource;
