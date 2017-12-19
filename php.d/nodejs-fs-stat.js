var fs = require('fs');
fs.stat('./all.json', function(err, stats){
 if(err){
  throw err;
 }else{
  console.log(stats);
 }
})
