const express = require('express');
const router = express.Router();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


class ApiRoutes {
    constructor(settings) {
        if(typeof settings != 'object' || Array.isArray(settings) === true) {
            throw new Error("Settings needs to be an object");
        }
        const defaultSettings = {
            url: '',
            pages: {
                all: {},
                single: {}
            },
            api: [

            ],
            single: false,
            router: router,
        }
        this.settings = Object.assign(defaultSettings, settings);
        this.data = {};
        this.init();
    }

    async init() {
        await this.getData()
        .then(() => {
            this.createAll();
            console.log('created all routes')})
        .then(() => {
            this.createSingle();
            console.log('created single routes')
        }).then(() => {
            console.log(this.settings.router.stack)
        });
    }

    createAll() {
        if(this.settings.multiple) {
            console.log('ran multi')
            this.settings.router.get('/:type', (req,res) => {
                const type = req.params.type;
                if(!this.settings.api[type]) {
                    res.render('pages/404', {
                        title: 404,
                        name: 404,
                    })
                } else {
                    res.render(this.settings.pages.all.page, {
                        title: this.settings.pages.all.title,
                        name: type,
                        data: this.data[type],
                        nav: this.settings.api
                    })
                }
            })
        } else {
            console.log('ran')
            this.settings.router.get('/', (req, res) => {
                res.render(this.settings.pages.all.page, {
                    title: this.settings.pages.all.title,
                    name: this.settings.pages.all.name,
                    data: this.data,
                    nav: this.settings.api
                });
            })
        }
    }

    createSingle() {
        let allData = this.data
        if(this.settings.single) {
            this.settings.router.get('/:type/:id', (req, res) => {
                const id = req.params.id;
                const type = req.params.type;
                let data;
                for(let i in allData[type]) {
                    if(allData[type][i].id === Number(id)) {
                        data = allData[type][i];
                    }
                }
                
                res.render(this.settings.pages.single.page, {
                    title: this.settings.pages.single.title,
                    name: type,
                    data: data,
                    nav: this.settings.api
                })
            })
        }
    }

    async getData() {
        for(let [key, value] of Object.entries(this.settings.api)) {
            let res = await fetch(value);
            let data = await res.json();
            this.data[key] = []
            this.data[key].push(...data);
        }
        return
    }
}

module.exports = ApiRoutes;