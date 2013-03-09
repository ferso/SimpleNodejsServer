var http  = require('http');
var fs    = require('fs');
var url   = require("url");
var path  = require("path");
var port  = 8000;
var file  = 'index.html';

http.createServer(function (req, res) {
	 var uri = url.parse(req.url).pathname
	, filename = path.join(process.cwd(), uri);
	if (fs.statSync(filename).isDirectory()) filename +='/'+file;	
	fs.readFile(filename,'binary',function(err,data){
		res.writeHead(200);
	    res.write(data,'binary');
	    res.end();
	});
}).listen(port);
console.log('Server running at ' + port);
