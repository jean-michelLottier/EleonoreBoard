export class PathModel {
  path: string;
  isActive: boolean;

  constructor(path: string, isActive: boolean) {
    this.path = path;
    this.isActive = isActive;
  }
}
