var jsonfile = require('jsonfile')
var fs = require('fs');
var filename = process.argv[2];
 
// match only filenames with a .txt extension and that don't start with a `.´ 
var i = 1;
var obj = [];

fs.readFile(filename, (err, data) => {
  if (err) throw err;
  console.log(data);
  var insertion;
  var array = data.toString().split("\n");
  for(index in array) {
      //console.log(array[index]);
      insertion = {"id":i,"body":array[index]};
      obj[i-1] = insertion;
      i++;
  }
  jsonfile.writeFile('Documents.json', obj, function (err) {
          //console.error(err)
        });
        console.log(obj);
});