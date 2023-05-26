const csvSplitStream = require('csv-split-stream');
const fs = require('fs');

return csvSplitStream.split(
  fs.createReadStream('/Users/dillonarmstrong/Hack/Quanswers/ETL/answers.csv'),
  {
    lineLimit: 1000000
  },
  (index) => fs.createWriteStream(`/Users/dillonarmstrong/Hack/Quanswers/ETL/answers-${index}.csv`)
)
.then(csvSplitResponse => {
  console.log('csvSplitStream succeeded.', csvSplitResponse);
  // outputs: {
  //  "totalChunks": 350,
  //  "options": {
  //    "delimiter": "\n",
  //    "lineLimit": "10000"
  //  }
  // }
}).catch(csvSplitError => {
  console.log('csvSplitStream failed!', csvSplitError);
});