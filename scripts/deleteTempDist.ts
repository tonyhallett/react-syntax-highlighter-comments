import * as rimraf from 'rimraf';

console.log('deleting .tempDist')
rimraf.sync('githubpages/.tempDist');
  