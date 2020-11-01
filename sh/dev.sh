rm -rf dist;
mkdir dist;
rollup -c;
cp src/index.html dist/index.html;
express-compression-server  --build=dist --port=1000;
