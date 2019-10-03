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

{
  "server":"45.33.108.61",
  "server_port":36785,
  "local_address": "127.0.0.1",
  "local_port":1080,
  "password":"43DUnYHj6b6ZSp65TRL7sVCA",
  "timeout":300,
  "method":"aes-256-cfb"
}
