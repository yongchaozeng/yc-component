# longyuan-chaosacademy-activity

天神学院活动

    npm i
    npm run start 启动项目
    npm run build:dev  dev部署
    npm run build:qa   qa部署
    npm run build:prod prod部署
        
目录

    axios   

接口 
    
    调用后台服务器统一post请求
    curdType, =0，查询抽奖数据；=1,分享成功；=2，领取奖品；=3，抽奖记录
    1000001 = 登录 1000002 = 分享
    post请求：{
    	"curdType": 0,
    	"userId": 1000001
    }
    
    curdType =0,返回数据：
    
    {
      "lotteryNum": 8,
      "dailyLottery": [{
                            "taskId": 11111,
          "awardId": 11111,
          "received": true
        },
        {
          "taskId": 22222,
          "awardId": 22222,
          "received": false
        }
      ]
    }
    
    curdType =1,返回数据：
    
    {
    	"errno": 0,
    	"errinfo": ""
            "awardId": 1000002
    }
    curdType =2,返回数据：
    {
    	"errno": 0,
    	"errinfo": ""
    }
    curdType =3,返回数据：
    {
    	"errno": 0,
    	"errinfo": 0,
    	"lotteryLog": [{
    			"awardId": 11111,
    			"lotteryTime": 11111
    		},
    		{
    			"awardId": 11111,
    			"lotteryTime": 11111
    		}
    	]
    }
