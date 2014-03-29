//var https = require('https');
//
//var options = {};
//
//https.request(options, function(response) {
//    var responseData = '';
//    response.setEncoding('utf8');
//
//    response.on('data', function(chunk){
//      responseData += chunk;
//    });
//
//    response.once('error', function(err){
//      // Some error handling here, e.g.:
//      res.serverError(err);
//    });
//
//    response.on('end', function(){
//      try {
//        // response available as `responseData` in `yourview`
//        res.locals.requestData = JSON.parse(responseData);
//      } catch (e) {
//        sails.log.warn('Could not parse response from options.hostname: ' + e);
//      }
//
//      res.view('yourview');
//    });
//  }).end();
