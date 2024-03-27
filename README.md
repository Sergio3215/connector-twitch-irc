# 👋🏼 Connector Twitch IRC
### This component is thought out for do connection on twitch easily.

### **_NOTE:_** _You need use the documentation of Tmi.js and Twitch_

# 🚀 Getting Started 

Install the component
```bash
npm i connector-twitch-irc
```

Imported the component connector-twitch-irc
```js
import { connectToStream, connectTwitch } from 'connector-twitch-irc';
```
Set your client ID of the app twitch
```js
const clientID_ = 'my client ID';
```

Set the link redirect for get the permissions of twitch on you app
```jsx
<button onClick={(() => {
            location.href = `https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${clientID_}&redirect_uri=${location.origin}&scope=chat%3Aread+chat%3Aedit`
          })}>
        Twitch
</button>
```

Use the functions _**connectTwitch**_ and  _**connectToStream**_ for that you can connect on twitch stream
```jsx
  const [connect, setConnect] = useState({});

  useEffect(() => {
    try {

      let session = sessionStorage.getItem('access_token');
      let token = '';

      if (!_loadingEffect) {
        if (session != null && session != undefined) {
          token = session;
          connectTwitch(session, setConnect);
        }
        else {
          token = location.hash.split('=')[1].split('&')[0];
          connectToStream(token, clientID_, setConnect);
        }

      }
    } catch (error) {

    }

  }, []);
```

# ✨ Scope of Twitch
#### the scope for this example is 'chat%3Aread+chat%3Aedit' (It is for read and edit message chat). I you need another permissions you need check of documentation of Twitch.

# 💻 Connect with sessionStorage
#### We need to use **_connectTwitch_**. This method use the sessionStorage as **_session_** variable. The variable **_session_** is an object where this variable has follow properties.
#### user: where you get the user session.
#### myToken: where you have the token.

# 📱 Connect without sessionStorage
#### We need to use **_connectToStream_**. This method has as parameter the token from hash link.

# 💻 Client ID
#### The client id is getted from twitch Developer Console. You can enter in the follow link : <a hred="https://dev.twitch.tv/">Twitch Develope</a>


# 👨🏼‍💻 setConnect
#### The set connect in the case of React js is for get the variable connect. In the case of Vanilla Js is an any function where you get as parameter an connector.

# 🤓 Code of Example with React JS

```jsx
import { connectToStream, connectTwitch } from 'connector-twitch-irc';
import { useEffect, useState } from "react";

const _loadingEffect = false;

const clientID_ = 'my client ID';

export default function Home() {

  const [connect, setConnect] = useState({});

  useEffect(() => {
    try {

      let session = sessionStorage.getItem('access_token');
      let token = '';

      if (!_loadingEffect) {
        if (session != null && session != undefined) {
          token = session;
          connectTwitch(session, setConnect);
        }
        else {
          token = location.hash.split('=')[1].split('&')[0];
          connectToStream(token, clientID_, setConnect);
        }

      }
    } catch (error) {

    }

  }, []);

  useEffect(() => {
    console.log(connect);
  }, [connect])

  return (
    <>
      <main className={`${styles.main} ${inter.className}`}>
        <button onClick={(
          () => {
            location.href = `https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${clientID_}&redirect_uri=${location.origin}&scope=chat%3Aread+chat%3Aedit`
          })
        }>Twitch</button>
      </main>
    </>
  );
}

```