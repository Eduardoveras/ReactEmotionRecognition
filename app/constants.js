export const localPath = 'http://localhost:3000';
export const developmentPath = 'https://sdec-backend.herokuapp.com';
// export const URL_PATH = `${window.location.hostname}`;

export const authConfig = {
  apiKey: 'AIzaSyB1mWTY9UZvone47npIeYcmNbxDzwU1JDg',
  authDomain: 'vue-path-maker.firebaseapp.com',
  databaseURL: 'https://vue-path-maker.firebaseio.com',
  projectId: 'vue-path-maker',
  storageBucket: 'vue-path-maker.appspot.com',
  messagingSenderId: '813989253785',
};

function getCorrectUrl() {
  let auxURL = null;
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    auxURL = `${localPath}/face_video_analyses`;
  } else {
    auxURL = `${developmentPath}/face_video_analyses`;
  }
  return auxURL;
}

export const URL_PATH = getCorrectUrl();
