goog.provide("IG.Data");
var data = [{
    "id": 1932198873,
    "screen_name": "去搞定",
    "name": "去搞定",
    "province": "31",
    "city": "15",
    "location": "上海 浦东新区",
    "description": "",
    "url": "",
    "profile_image_url": "asserts/1.jpeg",
    "domain": "",
    "gender": "m",
    "followers_count": 7,
    "friends_count": 33,
    "statuses_count": 53,
    "favourites_count": 0,
    "created_at": "Sun Jan 23 00:00:00 +0800 2011",
    "following": false,
    "allow_all_act_msg": false,
    "geo_enabled": true,
    "verified": false,
    "remark": "",
    "status": {
        "created_at": "Sat Apr 16 22:34:14 +0800 2011",
        "id": 9225339845,
        "text": "@去搞定 你定时了: 测试一下定时服务 634385900585110961",
        "source": "<a href=\"\" rel=\"nofollow\">未通过审核应用</a>",
        "favorited": false,
        "truncated": false,
        "in_reply_to_status_id": "",
        "in_reply_to_user_id": "",
        "in_reply_to_screen_name": "",
        "geo": null,
        "mid": "2111104163459919",
        "annotations": [{
            "type2": 123
        }]
    }
}];


IG.Data = function(){};

IG.Data.prototype.getData = function(){
	return data;
}
