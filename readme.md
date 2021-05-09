# DECREMENT CLOCK BY SECS PROVIDED

Application written in typescript.


Steps to launch app:

1 - clone repo / unzip

2 - root folder and install dependencies with yarn
```
yarn 
```
3 - build app and docker image as decrement_counter/dev
```
 yarn build
```
4 - run instance (requires port 8080) with $DECREMENT as an Integer > 0
```
 yarn run docker:deploy $DECREMENT
```
5 - STOP APP
```
    yarn run docker:down
```


You may open multiple browsers @[localhost:8080](http://localhost:8080) and check realtime counter clock time ticking by set decrement.



You can check the unit tests doing:
```
 yarn test
```
