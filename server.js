/* By Fernando Soto @ferso
contact: erickfernando@gmail.com
-------------------------------------- */
var http  = require('http');
var fs    = require('fs');
var url   = require("url");
var path  = require("path");
var port  = 9000;
var file   = 'index.html';
http.createServer(function (req, res) {
	 try{
	 var uri = url.parse(req.url).pathname
	, src    = path.join(process.cwd(), uri);	 
	  src    = fs.statSync(src).isDirectory() ? src+'/'+file : '/'+src ;	
	    console.log('/'+src);
	 	fs.readFile(src,'binary',function(err,data){
			res.writeHead(200);
		    res.write(data,'binary'); 
		    res.end();
		});
	 }catch(e){
	 	console.error(e);
	 }	
}).listen(port);
console.log('Server running at ' + port);
