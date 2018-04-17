var express = require('express');
var gulp = require('gulp');
var app = express();
// var bodyParser = require('body-parser');
// app.use(bodyParser.json());
app.use('/', express.static('public'));

app.post('/saveAd', function (req, res) {
    res.sendStatus(200);
});

gulp.task('express', function () {
    var server = app.listen(3000, function () {
        //console.log("server started at 3000");
    });
});
gulp.task('default', ['express']);