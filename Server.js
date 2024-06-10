import StaticServer from'react-native-static-server';
import RNFS from 'react-native-fs';

let path=RNFS.MainBundlePath + '/App-elie';
let server= new StaticServer(8000,path);
let serverUrl=null;

export function startServer(){
    if(!server){
        return Promise.reject('Webserver is undefined');
    }
    stopServer();

    return server.start().then(url => {serverUrl=url; console.log('Web Server started')})
}