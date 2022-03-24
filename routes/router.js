const express = require('express');
const router = express.Router();
const ApiRoutes = require('./api/api-routes');

router.use(express.static('public'));

const homeRoutes = new ApiRoutes({
    url: '/',
    baseApi: 'https://api.sampleapis.com/wines/',
    pages: {
        all: {
            page: 'pages/home',
            title: 'All Wines',
            name: 'Wine List'
        },
    },
    api: {
        reds: 'https://api.sampleapis.com/wines/reds',
        whites: 'https://api.sampleapis.com/wines/whites',
        sparkling: 'https://api.sampleapis.com/wines/sparkling',
        rose: 'https://api.sampleapis.com/wines/rose',
        dessert: 'https://api.sampleapis.com/wines/dessert',
        port: 'https://api.sampleapis.com/wines/port'
    },
    single: false,
    multiple: false
});

const wineRoutes = new ApiRoutes({
    url: '/wines',
    baseApi: 'https://api.sampleapis.com/wines/',
    pages: {
        all: {
            page: 'pages/wine-type',
            title: 'All Wines',
        },
        single: {
            page: 'pages/wine-single',
            title: 'Single Wines',
        },
    },
    api: {
        reds: 'https://api.sampleapis.com/wines/reds',
        whites: 'https://api.sampleapis.com/wines/whites',
        sparkling: 'https://api.sampleapis.com/wines/sparkling',
        rose: 'https://api.sampleapis.com/wines/rose',
        dessert: 'https://api.sampleapis.com/wines/dessert',
        port: 'https://api.sampleapis.com/wines/port'
    },
    single: true,
    multiple: true
});

router.use('/wines', wineRoutes.settings.router);

router.use('/', homeRoutes.settings.router);

router.get('*', (req, res) => {
    if(req.url == '/favicon.ico') {
        res.end()
    } else {
        res.render('pages/404', {
            title: 404,
            name: 404,
        })
    }
})


module.exports = router;