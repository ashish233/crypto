var request = require('request');
var async = require('async');


module.exports = function () {
    var apiController = {};

    apiController.getCoinList = function (req, res) {
        var Data = [];
        request({
            uri: "https://www.cryptocompare.com/api/data/coinlist/",
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:45.0) Gecko/20100101 Firefox/45.0",
                "Accept": "*/*"
            },
            timeout: 12000
        }, function (error, response, body) {
            //console.log(body);
            if (body) {
                var data = JSON.parse(body);
                //console.log(data.Data)
                async.eachSeries(data.Data, function(info, cb){
                    //console.log(info.Url);
                    Data.push(info);
                    cb();
                }, function(){
                    console.log("Done");
                    res.json({ success :true, Data : Data });
                })
            }
            else {
                res.json({ success: false, message: body["Message"] });
            }

        });


    }


    apiController.getPrice = function (req, res) {

        var fsym = req.query.fsym;
        var tsyms = req.query.tsyms;

        var url = 'https://min-api.cryptocompare.com/data/price?fsym=' + fsym + '&tsyms=' + tsyms;

        request({
            uri: url,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:45.0) Gecko/20100101 Firefox/45.0",
                "Accept": "*/*"
            },
            timeout: 12000
        }, function (error, response, body) {

            res.send(body);

        });
    }


    apiController.getPriceHistorical = function (req, res) {
        var fsym = req.query.fsym;
        var tsyms = req.query.tsyms;
        var ts = new Date().getTime();


        if (req.query.ts != null && req.query.ts != undefined && req.query.ts != '') {
            ts = req.query.ts;
        }

        console.log(ts);
        var url = 'https://min-api.cryptocompare.com/data/pricehistorical?fsym=' + fsym + '&tsyms=' + tsyms + '&ts=' + ts;
        console.log(url)
        request({
            uri: url,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:45.0) Gecko/20100101 Firefox/45.0",
                "Accept": "*/*"
            },
            timeout: 12000
        }, function (error, response, body) {
            console.log(body)

            res.json(body);

        });


    }


    apiController.getCoinSnapsShot = function (req, res) {

        var fsym = req.query.fsym;
        var tsyms = req.query.tsyms;
        // tsyms accept single value         
        var url = 'https://www.cryptocompare.com/api/data/coinsnapshot/?fsym=' + fsym + '&tsym=' + tsyms;
        console.log(url);
        request({
            uri: url,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:45.0) Gecko/20100101 Firefox/45.0",
                "Accept": "*/*"
            },
            timeout: 12000
        }, function (error, response, body) {

            res.send(body);


        });
    }


    apiController.getCoinSnapshotFullById = function (req, res) {
        
                var id = req.query.id;
                // tsyms accept single value         
                var url = 'https://www.cryptocompare.com/api/data/coinsnapshotfullbyid/?id='+id;
                console.log(url);
                request({
                    uri: url,
                    headers: {
                        "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:45.0) Gecko/20100101 Firefox/45.0",
                        "Accept": "*/*"
                    },
                    timeout: 12000
                }, function (error, response, body) {
        
                    res.send(body);
        
        
                });
            }

     
    return apiController;

}

