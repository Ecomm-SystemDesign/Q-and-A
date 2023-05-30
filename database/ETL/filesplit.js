const csvSplitStream = require('csv-split-stream');
const fs = require('fs');

return csvSplitStream.split(
  fs.createReadStream('/Users/dillonarmstrong/Hack/Quanswers/ETL/questions.csv'),
  {
    lineLimit: 1000000
  },
  (index) => fs.createWriteStream(`/Users/dillonarmstrong/Hack/Quanswers/ETL/questions-${index}.csv`)
)
.then(csvSplitResponse => {
  console.log('csvSplitStream succeeded.', csvSplitResponse);

}).catch(csvSplitError => {
  console.log('csvSplitStream failed!', csvSplitError);
});