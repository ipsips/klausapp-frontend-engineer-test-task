# Setup Firebase
1. Create a new project under the Firebase console.

2. Add a web application to your project. Make note of the firebaseConfig provided in the setup wizard. It should look something like the below. We will use this later:

```javascript
var firebaseConfig = {
  apiKey: "APIKEY",
  authDomain: "example-12345.firebaseapp.com",
  projectId: "example-12345",
  storageBucket: "example-12345.appspot.com",
  messagingSenderId: "1234567890",
  appId: "APPID",
};
```
3. Under Authentication in the administration console for, you will want to enable the Email/Password sign-in method.

4. You will want to add a user and password under Authentication and then Users section, making note of the values used for later.

5. Add Firestore Database to your project. The console will allow you to setup in production mode or test mode. It is up to you how you configure this, but production mode will require you to setup further security rules.

6. Add a collection to the database named songs. This will require you to add at least one document. Just set the document with an Auto ID.

Note: depending on the status of your Google account, there maybe other setup and administration steps that need to occur.