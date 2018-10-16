import PackageJson from './package-json';

export class Project {
  path: string;
  packageJson: PackageJson;

  constructor(path:string) {
    this.path = path;
  }

  async init() {
    this.packageJson = new PackageJson(this.path);
  }
}
