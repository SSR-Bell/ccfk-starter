const packageJson = require('../package.json'); // loads npm config file
const fs = require('fs');
// if version is passed in "npm run build -- '0.1.2-dev' " then use that
const version = process.env.PACKAGE_JSON || '0.0.0';
const { description, dependencies } = packageJson;

// create a package.json file
const newPackageJson = {
  name: '@nokia-csf-uxr/verification-app',
  description,
  version,
  private: false,
  dependencies
};

fs.writeFileSync('./dist/package.json', JSON.stringify(newPackageJson, null, 2));
