/* 	horrible lazy code...
	todo: 
		- make everything better
		- utils.log
		- custom log files
*/

var color = require('colors');
var start = function (logo, description, copyright, licence) {
	if(logo) {
		console.log("       ..---.. ".yellow);
		console.log("     .'  _    `. ".yellow);
		console.log(" __..'  (o)    : ".yellow);
		console.log("`..__          ; ".yellow);
		console.log("     `.       / ".yellow);
		console.log("       ;      `..---...___ ".yellow);
		console.log("     .'                   `~-. .-') ".yellow);
		console.log("    .                         ' _.' ".yellow);
		console.log("   :     MadeBy: Ankk4          : ".yellow);
		console.log("   \                           '".yellow);
		console.log("    +                         J".yellow);
		console.log("     `._                   _.'".yellow);
		console.log("        `~--....___...---~' ".yellow);
		console.log('\n');
	}

	if(description) {
		process.stdout.write("    ");
		console.log(description);
	}

	if(copyright) {
		process.stdout.write("    ");
		console.log('Copyright © ' + copyright);
	}
	if(licence) {
		process.stdout.write("    ");
		console.log('Licence: ' + licence);
	}

	console.log('\n');
};

var print = function (msg, level) {
	process.stdout.write("    ");
	//Info
	if (level === 0) { console.log(msg.blue); }

	//success
	else if (level === 1) { console.log(msg.green); }

	//warning
	else if (level === 2) { console.log(msg.yellow);	}

	//error
	else if (level === 3) { console.log(msg.red); }

	console.log('\n');
};

module.exports = {
	Start: start,
	Print: print 
};








 
