'use strict';

var generator = require('./pac-generator');

var normalizedPath = require('path').join(__dirname, 'src');

var outputDir = './generated-PACs';

var fs = require('fs')
try {
  fs.mkdirSync( outputDir );
} catch(e) {
  if ( e.code != 'EEXIST' ) throw e;
}

fs.readdirSync( normalizedPath )
  .filter( file => file.startsWith('blocked-') )
  .forEach( file =>
	  require('./src/'+ file)(
	    generator.hosts,
		generator.ips,
		generator,
		function generatePac() {
          var args = [].slice.call( arguments );
          args.unshift( outputDir +'/'+ file )
          generator.writeOutputToFile.apply( generator, args );
        }
      )
  );
