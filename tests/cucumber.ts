import { resolve } from 'path';

const options = {
  require: resolve(__dirname, '../step-definitions/**/*.ts'),
  paths: [resolve(__dirname, '../features/**/*.feature')],
};
export default options;