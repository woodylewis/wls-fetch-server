var express	= require('express');
var app	= express();
var cors = require('cors');
var bodyParser = require('body-parser');
var fs = require('fs-extra');

app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


var port = 5000;
var router = express.Router();

//----- LOG EVENTS ------------
router.use(function(req, res, next) {
	console.log('An Event');
	next();
});

//----- TEST ROUTE ------------
router.get('/', function(req, res, next){
	res.json({ message: 'TEST RESPONSE'});
});

//----- GET AND POST ROUTE ----------
router.route('/test_get')
.get(function(req, res, next){
	res.json({ message: 'TEST GET'});
	console.log('TEST GET');
}), function (err) {
	if(err) {
		res.send(err);
	}
};

router.route('/test_put')
.post(function(req, res, next) {
	console.log('TEST PUT');
	res.json({ message: 'TEST PUT'});
}), function (err) {
	if(err) {
		res.send(err);
	}
};

router.route('/post_json')
.post(function(req, res, next) {
	console.log('POST JSON');
	var obj = JSON.parse(req.body.data),
		name = obj.url;
		name = name.substr(name.indexOf('/') + 1);
		name += '.json';
	console.log(name);
	fs.writeJson(name, req.body.data, function (err) {
		if(err) {
			console.log('WRITE ERROR - ', err);
			res.send('error');
		}
		else {
			res.send('written');
		}
	});
}), function (err) {
	if(err) {
		res.send(err);
	}
};

//----- REGISTER ROUTES ----------
app.use('/', router);
app.listen(port);
console.log('Listening on port ' + port);