/**
 * Created by Administrator on 2018\1\21 0021.
 */
var express = require('express');
var app = express();
var mongoose = require('mongoose');
app.locals.moment = require("moment"); //时间日期格式化，给到全局变量
var Consume = require('./models/consume');
var bodyParser = require('body-parser'); //使用req.body获得提交的数据
var path = require("path");
var port = process.env.PORT || 5000;

mongoose.connect("mongodb://localhost/bang");
var db = mongoose.connection;
db.on('error', function (e) {
    console.log("connect mongodb error", e);
});
db.once('open', function () {
    console.log("连接数据库成功！");
});
app.set("views", "./views");
app.set("view engine", "jade");
app.set("port", port);

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "bower_components"))); //使用静态资源的根路径



app.get("/", function (req, res) {

    Consume.select(function (err, consumes) {
        if (err) {
            console.log("err", err);
            return;
        }
        res.render("index", {
            title: '首页',
            data: consumes
        });
    });

});

app.get("/consume/", function (req, res) {
    res.render("consume", {
        title: '添加消费记录',
        consume: {
            _id: '',
            money: '',
            scene: '',
            pay_way: '',
            useAt: '',
            updateAt: '',
            describe: ''
        }
    });
});

app.post("/consume/new", function (req, res) {
    console.log("req", req.body);
    var _consume = new Consume({
        money: req.body.money,
        scene: req.body.scene,
        pay_way: req.body.pay_way,
        useAt: req.body.useAt,
        updateAt: req.body.updateAt,
        describe: req.body.describe
    });

    _consume.save("consume", function (err, consume) {
        if (err) {
            console.log("err", err);
            return;
        }

        res.redirect('/');
    });
});

app.listen(port);

console.log("server start as " + port);