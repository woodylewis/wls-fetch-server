var express	= require('express');
var app	= express();
var cors = require('cors');

app.use(cors());

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

//----- REGISTER ROUTES ----------
app.use('/', router);
app.listen(port);
console.log('Listening on port ' + port);
