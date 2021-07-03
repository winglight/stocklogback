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