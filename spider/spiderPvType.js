// 输入：剧目aid数组
// 处理：获取播放量与类型，并将播放量存入tvBase表中，将类型存入tvType表中

var async = require('async');
var promise = require('promise');
var request = require('request');

var insertAlbumtype = require('../database/insertIntoAlbumType').insertAlbumtype;
var updatePv = require('../database/insertIntoAlbumBase').updatePv;
var insertType = require('../database/insertIntoTypedata').insertType;

var wdata,udata,typedata;

async function spiderPvType(tvIds) {
    for (let i = 0; i < tvIds.length; i++) {
        console.log('tv'+i)
        typedata = [];
        var url = 'http://mixer.video.iqiyi.com/jp/mixin/videos/' + tvIds[i];
        await getType(url,tvIds[i]);
        await insertAlbumtype(typedata);

    }
}

function getType(x,ti) {
    return new Promise(async function(resolve){
        request(x,async function(error, response, body) {
            if (error) {
                console.log(error);
            }
            var data = body.slice(body.indexOf('=')+1);
            data = JSON.parse(data);
            var playCount = data.playCount;
            
            await updatePv({tvid:ti},{pv:playCount});
            await async.eachSeries(data.categories,function(item,callback){
                typedata.push({'tvid':ti,'type':item.name})
                insertType(item.name,playCount,callback);
            },function(err){
                resolve();
            }) 
        })
    })
}


module.exports = spiderPvType;