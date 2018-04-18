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
    //console.log(req.body);
    db.calendar_master.find(function (err, resp) {

        resp.every(function (item) {
            if (req.body.start > item.start && req.body.start < item.end) {
                console.log("triggerend");
                res.send('Number already exists');
            }else{
                res.send('Ok');
            }
        })
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