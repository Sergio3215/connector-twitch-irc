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
import { initSession } from 'connector-twitch-irc';
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

Use the function **initSession** for conection directly with tmi.js and twitch
```jsx
  const [connect, setConnect] = useState({});
  useEffect(() => {
    try {
      if (!_loadingEffect) {
        initSession(clientID_, setConnect, false);
      }
    } catch (error) {

    }
  }, []);
```

# ✨ Scope of Twitch
#### the scope for this example is 'chat%3Aread+chat%3Aedit' (It is for read and edit message chat). I you need another permissions you need check of documentation of Twitch.

# 💻 Connect with sessionStorage
#### We are going to go connected the token and user on session storage, where you save this one. It is automatically.

# 💻 initSession
#### The function initSession is called when you need init this.
#### You have 3 params: clientID_, setConnect, debug


# 💻 Debug
#### You can set debug in the console of devtools on browser, it is a function for logger.

# 💻 Client ID
#### The client id is getted from twitch Developer Console. You can enter in the follow link : <a href="https://dev.twitch.tv/">Twitch Develope</a>


# 🤓 Code of Example with React JS

```jsx
import { initSession } from 'connector-twitch-irc';
import { useEffect, useState } from "react";

const _loadingEffect = false;

const clientID_ = 'my client ID';

export default function Home() {

  const [connect, setConnect] = useState({});

  useEffect(() => {
    try {
      if (!_loadingEffect) {
        initSession(clientID_, setConnect, false);
        _loadingEffect = !_loadingEffect;
      }
    } catch (error) {

    }
  }, []);

  useEffect(() => {
    console.log(connect);
    connect.connect().catch(console.error);
  }, [connect])

  return (
    <>
      <main>
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

# 📈 Version

### Version 1.1.6
#### Fix the error with connection in twitch

### Version 1.0.1
#### Fix the issue "Error connection on Twitch"