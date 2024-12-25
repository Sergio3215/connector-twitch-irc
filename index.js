//@ts-check

/**
 * @type {object}
 */
const Tmi = require("tmi.js");


/**
 * 
 * @author SerezDev
 * 
 * @copyright Copyright (c) SerezDev
 * 
 * @description An extension for do more easy the connection on Twitch, and use for many cases
 * 
 */


/**
 * Connect directly to Twitch using sessionStorage and any function for set the connection variable.
 * 
 * @param {string} user The name of user.
 * @param {string} myToken The string of token generated.
 * @param {Function} setConnect This is the function for get the connect of twitch data. 
 * 
 */
const connectTwitch = async (user, myToken, setConnect, debug) => {
    let client = {};

    client = new Tmi.Client({
        options: {
            debug: debug,
            reconnect: true,
            secure: true
        },
        identity: {
            username: user,
            password: myToken.includes("oauth") ? myToken : "oauth:" + myToken
        },
        channels: [user]
    });

    if (location.hash.includes('#access_token=') && myToken != undefined) {

        if (myToken.includes("oauth")) {
            sessionStorage.setItem('access_token', myToken.split("oauth:")[1]);
        }
        else {
            sessionStorage.setItem('access_token', myToken);
        }
        sessionStorage.setItem('user', user);

        location.href = location.origin;
    }

    setConnect(client);
}

const getAccount = async (token, clientID_, setConnect) => {
    await fetch('https://api.twitch.tv/helix/users',
        {
            headers: {
                "Client-Id": clientID_,
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(async (obj) => {
            if (obj.status == undefined) {
                let myObj = obj.data[0];

                let user = myObj.login,
                    myToken = "oauth:" + token

                connectTwitch(user, myToken, setConnect, false)
            }
        })
        .catch(err => {
            console.log(err.message)
            sessionStorage.removeItem("token");
        })
}

/**
 * First Connection, when you get the token on URL.
 * 
 * @param {String} token  This is token that you get in connectTwitchWithURL.
 * @param {String} clientID_  This is client id of app twitch.
 * @param {function} setConnect  This is the function for get the connect of twitch data.
 * 
 */

async function connectToStream(token, clientID_, setConnect) {
    await getAccount(token, clientID_, setConnect);
}
/**
 * 
 * @param {String} clientID_ this client id is the id of your project
 * @param {function} setConnect It is a function where recive or get the connection
 * @param {Boolean} debug boolean for debugger the connection.
 */
const initSession = (clientID_, setConnect, debug)=>{

    let session = sessionStorage.getItem('access_token');
    let user = sessionStorage.getItem('user');
    let token = '';

    if (session != null && session != undefined) {
        token = session;
        connectTwitch(user, session, setConnect, debug);
      }
      else {
        token = location.hash.split('=')[1].split('&')[0];
        connectToStream(token, clientID_, setConnect);
      }
}

module.exports = {
    initSession
}