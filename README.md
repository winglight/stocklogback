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
