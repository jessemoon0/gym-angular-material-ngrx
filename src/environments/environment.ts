// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAIF0SHw9mKlD4jeI3gSUoicsE5SKykqbk',
    authDomain: 'material-gym-app.firebaseapp.com',
    databaseURL: 'https://material-gym-app.firebaseio.com',
    projectId: 'material-gym-app',
    storageBucket: 'material-gym-app.appspot.com',
    messagingSenderId: '517955659250'
  }
};
