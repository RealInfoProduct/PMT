export const baseURL = "https://identitytoolkit.googleapis.com/v1/accounts:";

export const environment = {
  production: true,

   firebaseConfig : {
    apiKey: "AIzaSyCVQXH95vatdRb6GUm3qIRk_UCbk76J72A",
    authDomain: "pmtool-12fb5.firebaseapp.com",
    projectId: "pmtool-12fb5",
    storageBucket: "pmtool-12fb5.appspot.com",
    messagingSenderId: "263241380469",
    appId: "1:263241380469:web:d882e25455c224d2247e3c",
    measurementId: "G-4M61LKGDT1"
  },

    // API URLs Started ========
    signIn: `${baseURL}signInWithPassword?key=`,
    signUp: `${baseURL}signUp?key=`,
    forgetPassword: `${baseURL}sendOobCode?key=`,
    changePassword: `${baseURL}update?key=`,

};
