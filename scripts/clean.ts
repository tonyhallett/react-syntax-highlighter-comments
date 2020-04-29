import * as rimraf from 'rimraf';

function cleanSource(){
  console.log('clean dist');
  rimraf.sync('dist');
  /*
    https://github.com/microsoft/TypeScript/issues/36648
    If were to change the name of the file there would still be the old file
    Cannot delete the directory first as incremental only produces files for changes

    So will run this in a final build
  */
  console.log('clean tsBuildInfoFile');
  rimraf.sync('ts-build-Cache');
}

cleanSource();

