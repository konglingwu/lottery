// var FtpDeploy = require('ftp-deploy');
// var ftpDeploy = new FtpDeploy();
// var path = require('path');

// var config = {
// 	username: "root",
// 	password: "Jiuze888888", // optional, prompted if none given
// 	host: "120.55.126.155",
// 	port: 22,
// 	localRoot: path.resolve(__dirname, '../dist'),
// 	remoteRoot: "/opt/tomcat/webapps/ROOT/",
// 	// include: ['assets/*', 'index.html'],
// 	exclude: ['.sync', 'images/*', 'META-INF/*', 'reg/*', 'WEB-INF/*', 'chat.html', 'MyJsp.jsp']
// }

// ftpDeploy.deploy(config, function(err) {
// 	if (err) console.log(err) // error authenticating or creating/traversing directory
// 	else console.log('finished');
// });
var SftpUpload = require('sftp-upload'),
	fs = require('fs'),
	path = require('path');

var options = {
		host: '120.55.126.155',
		username: 'root',
		path: path.resolve(__dirname, '../dist'),
		remoteDir: "/opt/tomcat/webapps/ROOT/",
	privateKey: fs.readFileSync('privateKey_rsa'),
		passphrase: fs.readFileSync('privateKey_rsa.passphrase')
	},
	sftp = new SftpUpload(options);

sftp.on('error', function(err) {
		throw err;
	})
	.on('uploading', function(progress) {
		console.log('Uploading', progress.file);
		console.log(progress.percent + '% completed');
	})
	.on('completed', function() {
		console.log('Upload Completed');
	})
	.upload();
