
const API = {
	errorResponse: function (res, err) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: {}
		});
	},
	notImplemented: function (res) {
		res.status( 501);
		res.render('error', {
			message: `Sorry, we are a new service, we still have some work to do`,
			error: {}
		});
	}
};



module.exports = API;