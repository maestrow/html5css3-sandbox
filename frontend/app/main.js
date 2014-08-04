requirejs.config({
	baseUrl: '/frontend/bower_components',

	paths: {
		app: '../app',
		jquery: 'jquery/dist/jquery',
		cssbeautify: 'cssbeautify/cssbeautify',
		bootstrap: 'bootstrap/dist/js/bootstrap',
		treetemplator: 'treetemplator/treetemplator'
	},

	shim: {
		'bootstrap': {
			deps: ['jquery']
		}
	}
});

requirejs(['app/styles-switcher']);