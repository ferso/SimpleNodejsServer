/* By Fernando Soto @ferso
contact: erickfernando@gmail.com
-------------------------------------- */
const http  = require('http');
const fs    = require('fs');
const url   = require("url");
const path  = require("path");
const util  = require('util');
const {exec}  = require('child_process');

const mimes = {
	'3dmf'		: 'x-world/x-3dmf',
	'3dm'		: 'x-world/x-3dmf',
	'avi'		: 'video/x-msvideo',
	'ai'		: 'application/postscript',
	'bin'		: 'application/octet-stream',
	'bin'		: 'application/x-macbinary',
	'bmp'		: 'image/bmp',
	'cab'		: 'application/x-shockwave-flash',
	'c'			: 'text/plain',
	'c++'		: 'text/plain',
	'class'		: 'application/java',
	'css'		: 'text/css',
	'csv'		: 'text/comma-separated-values',
	'cdr'		: 'application/cdr',
	'doc'		: 'application/msword',
	'dot'		: 'application/msword',
	'docx'		: 'application/msword',
	'dwg'		: 'application/acad',
	'eps'		: 'application/postscript',
	'exe'		: 'application/octet-stream',
	'gif'		: 'image/gif',
	'gz'		: 'application/gzip',
	'gtar'		: 'application/x-gtar',
	'flv'		: 'video/x-flv',
	'fh4'		: 'image/x-freehand',
	'fh5'		: 'image/x-freehand',
	'fhc'		: 'image/x-freehand',
	'help'		: 'application/x-helpfile',
	'hlp'		: 'application/x-helpfile',
	'html'		: 'text/html',
	'htm'		: 'text/html',
	'ico'		: 'image/x-icon',
	'imap'		: 'application/x-httpd-imap',
	'inf'		: 'application/inf',
	'jpe'		: 'image/jpeg',
	'jpeg'		: 'image/jpeg',
	'jpg'		: 'image/jpeg',
	'js'		: 'application/x-javascript',
	'java'		: 'text/x-java-source',
	'latex'		: 'application/x-latex',
	'log'		: 'text/plain',
	'm3u'		: 'audio/x-mpequrl',
	'midi'		: 'audio/midi',
	'mid'		: 'audio/midi',
	'mov'		: 'video/quicktime',
	'mp3'		: 'audio/mpeg',
	'mpeg'		: 'video/mpeg',
	'mpg'		: 'video/mpeg',
	'mp2'		: 'video/mpeg',
	'ogg'		: 'application/ogg',
	'phtml'		: 'application/x-httpd-php',
	'php'		: 'application/x-httpd-php',
	'pdf'		: 'application/pdf',
	'pgp'		: 'application/pgp',
	'png'		: 'image/png',
	'pps'		: 'application/mspowerpoint',
	'ppt'		: 'application/mspowerpoint',
	'ppz'		: 'application/mspowerpoint',
	'pot'		: 'application/mspowerpoint',
	'ps'		: 'application/postscript',
	'qt'		: 'video/quicktime',
	'qd3d'		: 'x-world/x-3dmf',
	'qd3'		: 'x-world/x-3dmf',
	'qxd'		: 'application/x-quark-express',
	'rar'		: 'application/x-rar-compressed',
	'ra'		: 'audio/x-realaudio',
	'ram'		: 'audio/x-pn-realaudio',
	'rm'		: 'audio/x-pn-realaudio',
	'rtf'		: 'text/rtf',
	'spr'		: 'application/x-sprite',
	'sprite'	: 'application/x-sprite',
	'stream'	: 'audio/x-qt-stream',
	'swf'		: 'application/x-shockwave-flash',
	'svg'		: 'text/xml-svg',
	'sgml'		: 'text/x-sgml',
	'sgm'		: 'text/x-sgml',
	'tar'		: 'application/x-tar',
	'tiff'		: 'image/tiff',
	'tif'		: 'image/tiff',
	'tgz'		: 'application/x-compressed',
	'tex'		: 'application/x-tex',
	'txt'		: 'text/plain',
	'vob'		: 'video/x-mpg',
	'wav'		: 'audio/x-wav',
	'wrl'		: 'model/vrml',
	'wrl'		: 'x-world/x-vrml',
	'xla'		: 'application/msexcel',
	'xls'		: 'application/msexcel',
	'xls'		: 'application/vnd.ms-excel',
	'xlc'		: 'application/vnd.ms-excel',
	'xml'		: 'text/xml',
	'zip'		: 'application/x-zip-compressed',
	'zip'		: 'application/zip'
}


const port  = 9000;
const file  = 'index.html';

const server = http.createServer(function (req, res) {
	 try{
	 const uri    = url.parse(req.url).pathname;
	 const upath  = path.join(process.cwd(), uri);	 
	 const src    = fs.statSync(upath).isDirectory() ? path.join(upath,file ): '/'+upath ;
	 const ext    = src.substring(src.lastIndexOf('.')+1, src.length) || src

	 const mime   = mimes[ext] ? mimes[ext] : 'text/plain';

	 	fs.readFile(src,'binary',function(err,data){
	 		if(!err){	 			
	 			res.setHeader('Content-Type',mime)
				res.writeHead(200);
			    res.write(data,'binary'); 
			    res.end();
		   	}else{
		   		res.pause();
		   	}
		});

	 }catch(e){
	 	console.log(e)
	 }	
})

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

const open = () =>{
	exec('open http://localhost:'+port, (err, stdout, stderr) => {
	  if (err) {
	    console.error(err);
	    return;
	  }
	  console.log(stdout);
	});
}

server.listen(port);
open();

console.log('================================');
console.log('Server running at ' + port);
console.log('===========================');


