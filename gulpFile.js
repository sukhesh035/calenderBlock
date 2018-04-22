var express = require('express');
var gulp = require('gulp');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('calendar_block', ['calendar_master']);
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use('/', express.static('public'));

app.post('/saveAd', function (req, res) {
    //console.log(req.body);
    db.calendar_master.find(function (err, resp) {
        db.calendar_master.insert(req.body, function (resp, err) {
            res.sendStatus(200);
        });
    })
});

app.post('/queryTime', function (req, res) {
    console.log(req.body);
    var temp = false;
    db.calendar_master.find(function (err, resp) {
        if(resp){

            for(var i=0;i<resp.length;i++){
                if (req.body.start > resp[i].start && req.body.start < resp[i].end) {
                    temp = true;
                    res.send('Number already exists');

                }
            }

            // resp.every(function (item) {
            //     console.log("req.body.start:"+req.body.start);
            //     console.log("item.start:"+item.start)
            //     console.log("item.end:"+item.end);
                
            //     if (req.body.start > item.start && req.body.start < item.end) {
            //         console.log("triggerend");
            //         temp = true;
            //         res.send('Number already exists');

            //     }
            // })
            if(!temp)
            res.send('Ok');
        }
    })
});

app.get('/getAds', function (req, res) {
    db.calendar_master.find(function (err, resp) {
        res.send(resp)
        //console.log(err);
    })
})

gulp.task('express', function () {
    var server = app.listen(3000, function () {
        ////console.log("server started at 3000");
    });
});
gulp.task('default', ['express']);