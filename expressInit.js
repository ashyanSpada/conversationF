const express = require('express');
const app = express();
const cluster = require('cluster');
const numCPUS = require('os').cpus().length;


if(cluster.isMaster){
	console.log(`Master ${process.pid} is running`);
	for(let i = 0;i<numCPUS; i++){
		cluster.fork();
	}
}else{
	app.use(express.static('./'));
	app.get('/', (req, res) => {
		res.render('index.html');
	});
	app.listen(8088);
	console.log(`Worker ${process.pid} started`);
}