const http=require('http');
const https=require('https');
const fs=require('fs');
const url=require('url');
const path=require('path');
const mine=require('./mine.js');

const con=http.createServer((req,res)=>{
	var pathname=url.parse(req.url).pathname;
	var realpath="."+(pathname=='/' ? "/index.html" : pathname);
	var ext=path.extname(realpath);
	ext=ext ? ext.slice(1) : "unknown";
	console.log(pathname, ext, mine["types"][ext], mine);
	fs.readFile(realpath,(err,data)=>{
		if(err){
			res.writeHeader(404,{
				"Content-Type":'text/html;charset="utf-8"'
			});
			res.write("<h1>页面未找到</h1>");
			res.end();
		}else{
			res.writeHeader(200,{
				"Content-Type":mine["types"][ext] || 'text/html'+';charset="utf-8"'
			});
			res.write(data);
			res.end();
		}
	});

});
function startServer(req,res){
	var pathname=url.parse(req.url).pathname;
	var realpath="."+(pathname=='/' ? "/index.html" : pathname);
	var ext=path.extname(realpath);
	ext=ext ? ext.slice(1) : "unknown";
	fs.readFile(realpath,(err,data)=>{
		if(err){
			res.writeHeader(404,{
				"Content-Type":'text/html;charset="utf-8"'
			});
			res.write("<h1>页面未找到</h1>");
			res.end();
		}else{
			res.writeHeader(200,{
				"Content-Type":mine[ext] || 'text/html'+';charset="utf-8"'
			});
			res.write(data);
			res.end();
		}
	});
}
const options={
	key:fs.readFileSync("./cert/214192781080192.key"),
	cert:fs.readFileSync("./cert/214192781080192.pem")
}
https.createServer(options,startServer).listen(443);
con.listen(80);
