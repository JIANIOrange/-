// 输入：爬取的页面结构
// 处理：获取albumId,tvId,title，将albumId,tvId,title存入AlbumBase表中
//输出：tvId数组，albumId数组

var async = require('async');
var fs = require('fs');
var promise = require('promise');
var request = require('request');
var path = require('path');
var insertAlbumdata = require('../database/insertIntoAlbumBase').insertAlbumdata;

// path.resolve(__dirname,'')

function spiderBase($){

    return new Promise(resolve => {
        var tvIdArr = [];
        var albumIdArr = [];
    
        async.eachSeries($('.site-piclist_pic a:first-child'),function(item,callback){
            var albumId = $(item).attr('data-qipuid'),
                tvId = $(item).attr('data-qidanadd-tvid'),
                title = $(item).attr('title');

            var src = 'http:' + $(item).find('img').first().attr('src');

            request.head(src,function(err,res,body){
                if(err){
                    console.log(err);
                }
                request(src).pipe(fs.createWriteStream(path.resolve(__dirname , '../my-app/src/image/' + albumId +'.jpg')));
            })
            tvIdArr.push(tvId);
            albumIdArr.push(albumId);
            insertAlbumdata({'aid' : albumId,'tvid' : tvId,'title' : title},callback);
        },function(err){
            resolve({
                tvIdArr : tvIdArr,
                albumIdArr : albumIdArr
            });
        }) 
    })

   
}

module.exports = spiderBase;