// 输入：剧目aid
// 处理：获取人群特性，并将人群特性存入AlbumPeople表中

var fs = require('fs');
var async = require('async');
var promise = require('promise');
var request = require('request');

var updateAlbumpeople = require('../database/insertIntoAlbumPeople');
var getType = require('../database/insertIntoAlbumType').getType;
var seachPvTvid = require('../database/insertIntoAlbumBase').seachPvTvid;
var insertPeople = require('../database/insertIntoTypedata').insertPeople;


function getPvData(list,pv){
    return new Promise(resolve => {
        for(let i = 0; i < list.length; i++){
            list[i] = Math.floor(list[i] * pv)
        }
        resolve();
    })
}

async function spiderPeopleData(albumIds) {
    for (let i = 0; i < albumIds.length; i++) {
        console.log('people'+i)
        var url = 'https://uaa.if.iqiyi.com/video_index/v2/get_user_profile?album_id=' + albumIds[i];
        await getPeopleData(url,albumIds[i]);
        // await updateAlbumpeople(albumIds[i],infoList);
        
    }
}

function getPeopleData(x,aid) {
    return new Promise(resolve => {
        request(x,async function(error, response, body) {
            if (error) {
                console.log(error);
            }
            var retdata = await seachPvTvid(aid);
            var data = JSON.parse(body);
                data = data.data.details[0];
            var key = Object.keys(data)[0];
            var infoList = data[key].gender;
            infoList = infoList.concat(data[key].age);
            await getPvData(infoList,retdata.pv);
            await updateAlbumpeople(aid,infoList);
            var types = await getType(retdata.tvid);
            console.log(types);
            console.log(types);
            for(let i = 0; i < types.length; i++){
                types[i] = '"'+types[i]+'"'
            }
            // console.log(types.toString());
            await insertPeople(types.toString(),infoList);
            resolve();
        })
    })
}

module.exports = spiderPeopleData;


