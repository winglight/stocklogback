## react-admin init scripts
```
npm install -g create-react-app
create-react-app test-admin
cd test-admin/
yarn add react-admin ra-data-json-server prop-types ra-data-parse
yarn start
```

## parse server start scripts
```
npm install -g parse-server mongodb-runner
mongodb-runner start
parse-server --appId stocklog --masterKey dkElkfdjiEOij843lKD --databaseURI mongodb://localhost/stocklog

npm install -g parse-dashboard
parse-dashboard --appId stocklog --masterKey dkElkfdjiEOij843lKD --serverURL "http://localhost:1337/parse" --appName stocklog
parse-dashboard --appId stocklog --masterKey dkElkfdjiEOij843lKD --serverURL "http://www.jyrz.xyz/parse" --appName stocklog
parse-dashboard --appId stocklog --masterKey dkElkfdjiEOij843lKD --serverURL "http://stocklogs.herokuapp.com/parse" --appName stocklog
```

Open PowerShell as Admin.

stop winnat with command below:

net stop winnat

start winnat again with command below:

net start winnat

version: "2"
services:
  jellyfin:
    image: jellyfin/jellyfin
    user: 1000:1000
    network_mode: "host"
    volumes:
      - /volume2/backup/mdisk/work/jellyfish/config:/config
      - /volume2/backup/mdisk/work/jellyfish/cache:/cache
      - /volume2/video:/media

      strategies = [
    "三连阳;三天成交量逐步放大；非科创；非st；成交量增长率排序",
    "上影线<1%;实体<2%;下影线>4%;阳线;非科创;非st;按下影线排序",
    "15日内三重底;当日量比大于1.5且小于3;非st;非科创;按量比排序",
    "放量且长阳;突破阻力位;涨幅排序;非科创;非st",
    "非ST;连续4日散户数量＜150;0%＜3日增仓占比＜35%;连续3日资金流入＞110万;30日涨幅＞18%;0＜19日内涨停次数;收盘价＞5日均线;按连续4日的dde散户数量升序排列",
    "ma5>ma10>ma20;阳线;量价齐升;开盘价格>ma5,开盘竞价涨幅>200并且<600,量比>4;非科创;非st",
    "昨日5连阳;今日大阴;非科创;非st"
]