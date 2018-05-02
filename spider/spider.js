var cheerio = require('cheerio');
var request = require('request');
var async = require('async');
var promise = require('promise');

//获取数据的模块
var spiderBase = require('./spiderBase');
var spiderPvType = require('./spiderPvType');
var spiderPeopleData = require('./spiderPeopleData');

//i变量控制爬取剧目的数量，3000个剧目
var i = 0;
var data = {
    tvIdArr : [],
    albumIdArr : []
};

//初始url
var url = "http://list.iqiyi.com/www/2/----------------iqiyi--.html";
var nextUrl = '';

//延迟函数
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

//获取剧目播放量以及类型并且存储数据库
async function task1 (callback) {
    await spiderPvType(data.tvIdArr);
    await sleep(5000);
    callback(null);
}

//获取剧目人群特性数据并且存储数据库
async function task2 (callback) {
    await spiderPeopleData(data.albumIdArr);
    await sleep(5000);
    callback(null);
}

var task = [task2];

function fetchPage(x) {
    startRequest(x);
}

function startRequest(x) {

    return new Promise(resolve => {

        request(x,async function(error,response,body){
        
            var $ = cheerio.load(body);
    
                spiderBase($).then(function(retdata){
                    data.tvIdArr = retdata.tvIdArr;
                    data.albumIdArr = retdata.albumIdArr;

                    if(i < 5){
                        nextUrl = "http://list.iqiyi.com" + $('.mod-page a:last-child').attr('href');
                        i++; 
                        async.eachSeries(task,function(item,callback) {
                            item(function(){
                                callback();
                            });
                        },function(err){
                            if(i < 5){
                                fetchPage(nextUrl)
                            }
                        }) 
                    }
                });

                resolve();
        }) 

    })      
}

fetchPage(url)


