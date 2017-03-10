'use strict';
var Hapi = require('hapi');

var server = new Hapi.Server();

server.connection( {port: process.env.port || 3000} );

server.register(require('inert'), (err) => {

    if (err) {throw err;}

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: 'public'
            }
        }
    });

});

server.register(require('vision'), (err) => {

    if (err) {throw err;}

    var routes = [
        {method: 'GET',path: '/',
            handler: function (request, reply) {
                reply.view('index', { title: 'Home'});
            }
        },
        {method: 'GET',path: '/about',
            handler: function (request, reply) {
                reply.view('about', { title: 'About'});
            }
        }
    ];
    server.route(routes);

    server.views({
        engines: {html: require('handlebars') },
        path: 'views',
        layoutPath: 'views/layout',
        layout: 'default',
        helpersPath: 'views/helpers',
        partialsPath: 'views/partials'
    });
});

server.start();