var datasets = require(process.cwd() + '/datasets');

module.exports.get = function (req, res) {
  var dataset = req.params.dataset;

  if (dataset && datasets.hasOwnProperty(dataset)) {
    var classification = {};

    var data = datasets[dataset];
    var code = req.params.code;

    for (var i = 0; i < data.length; i++) {
      var item = data[i];

      if (item.code == code) {
        classification = item;
        break;
      }
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write( JSON.stringify(classification) );
    res.end();
  } else {
    // no dataset 
  }
}
