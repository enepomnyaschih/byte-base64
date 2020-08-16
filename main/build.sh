./clean.sh
../node_modules/.bin/tsc
../node_modules/.bin/babel --out-dir dist dist-tsc
mv dist-tsc/*.d.ts dist
mv dist-tsc/lib.js dist/lib.es6.js
