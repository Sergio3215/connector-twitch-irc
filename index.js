//@ts-check

/**
 * @type {object}
 */
const Tmi = require("tmi.js");


/**
 * 
 * @author Principiante En Programar
 * 
 * @copyright Copyright (c) Principiante En Programar
 * 
 * @description An extension for do more easy the connection on Twitch, and use for many cases
 * 
 */


/**
 * Connect directly to Twitch using sessionStorage and any function for set the connection variable.
 * 
 * @param {Object} session The session of getted from sessionStorage object.
 * @param {Function} setConnect This is the function for get the connect of twitch data. 
 * 
 */
const connectTwitch = async ({ user, myToken }, setConnect) => {
    let client = {};

    client = new Tmi.Client({
        options: {
            debug: false,
            reconnect: true
        },
        identity: {
            username: user,
            password: myToken
        },
        channels: [user]
    });

    if (location.hash.includes('#access_token=')) {

        sessionStorage.setItem('access_token', JSON.stringify(
            {
                user: user,
                myToken: myToken
            }
        ));

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

                let login = {
                    user: myObj.login,
                    myToken: "oauth:" + token
                }

                connectTwitch(login, setConnect)
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

module.exports = {
    connectToStream,
    connectTwitch
}