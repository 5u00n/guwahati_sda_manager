import firebase from "firebase/compat/app";

import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/storage";

class FirebaseAuthBackend {
    constructor(firebaseConfig) {
        if (firebaseConfig) {
            // Initialize Firebase
            firebase.initializeApp(firebaseConfig);
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    localStorage.setItem("authUser", JSON.stringify(user));
                } else {
                    localStorage.removeItem("authUser");
                }
            });
        }
    }

    /**
     * ----------------------------------------------------------------------------------------------------------------------------------------
     *
     * Create one time superadmin user if no users exists or no superadmin exists or /users/ doesn't exists in realtime database
     *
     * -----------------------------------------------------------------------------------------------------------------------------------------
     */

    auth = () => firebase.auth();

    createSuperAdminUser = async (uid, user) => {
        return new Promise((resolve, reject) => {
            try {
                //const userUID = await this.addUser(user.email, user.pass);
                //const uid = String(userUID.user.uid);
                const userID = uid;
                const usersPath = `/users`;
                const userRef = firebase.database().ref(usersPath).child(userID);
                user.id = userID;
                user.type = "superadmin";
                userRef.set(user, (error) => {
                    if (error) {
                        reject(this._handleError(error));
                    } else {
                        resolve({ user });
                    }
                });
            } catch (error) {
                reject(this._handleError(error));
            }
        });
    };

    createUserData = async (uid, user) => {
        return new Promise((resolve, reject) => {
            try {
                const userID = uid;
                const usersPath = `/users`;
                const userRef = firebase.database().ref(usersPath).child(userID);
                user.id = userID;
                user.type = "users";
                user.for_school = "";
                user.status = "waiting";

                userRef.set(user, (error) => {
                    if (error) {
                        reject(this._handleError(error));
                    } else {
                        resolve(user);
                    }
                });
            } catch (error) {
                reject(this._handleError(error));
            }
        });
    };

    /**
     * Registers the user with given details
     */
    registerUser = (email, password) => {
        return new Promise((resolve, reject) => {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(
                    () => {
                        resolve(firebase.auth().currentUser);
                    },
                    (error) => {
                        reject(this._handleError(error));
                    }
                );
        });
    };

    /**
     * Registers the user with given details
     */
    editProfileAPI = (email, password) => {
        return new Promise((resolve, reject) => {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(
                    () => {
                        resolve(firebase.auth().currentUser);
                    },
                    (error) => {
                        reject(this._handleError(error));
                    }
                );
        });
    };

    addUser = (email, password) => {
        return new Promise((resolve, reject) => {
            try {
                const userCredential = firebase.auth().createUserWithEmailAndPassword(email, password);
                resolve(userCredential);

                // You may perform additional actions after adding the user
            } catch (error) {
                reject(error.message);
            }
        });
    };

    /**
     * Login user with given details
     */
    loginUser = (email, password) => {
        return new Promise((resolve, reject) => {
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(
                    () => {
                        resolve(firebase.auth().currentUser);
                    },
                    (error) => {
                        reject(this._handleError(error));
                    }
                );
        });
    };

    /**
     * forget Password user with given details
     */
    forgetPassword = (email) => {
        return new Promise((resolve, reject) => {
            firebase
                .auth()
                .sendPasswordResetEmail(email, {
                    url: window.location.protocol + "//" + window.location.host + "/login",
                })
                .then(() => {
                    resolve(true);
                })
                .catch((error) => {
                    reject(this._handleError(error));
                });
        });
    };

    /**
     * Logout the user
     */
    logout = () => {
        return new Promise((resolve, reject) => {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    resolve(true);
                })
                .catch((error) => {
                    reject(this._handleError(error));
                });
        });
    };

    /**
     * Returns the authenticated user
     */
    getAuthenticatedUser = () => {
        if (!localStorage.getItem("authUser")) return null;
        return JSON.parse(localStorage.getItem("authUser"));
    };

    /**
     * Fetch data from the Realtime Database at a specific path
     */
    fetchDataRequest = async (path) => {
        return new Promise((resolve, reject) => {
            const databaseRef = firebase.database().ref(path);
            databaseRef.on("value", (snapshot) => {
                resolve(snapshot.val());
            });
        });
    };

    fetchDataRealtime = async (path) => {
        return new Promise((resolve, reject) => {
            const databaseRef = firebase.database().ref(path);
            databaseRef.on("value", (snapshot) => {
                resolve(snapshot.val());
            });
        });
    };

    fetchDataOnce = async (path) => {
        const snapshot = await firebase.database().ref(path).once("value");
        const data = snapshot.val();
        const formattedData = [];

        for (let id in data) {
            formattedData.push({
                id,
                ...data[id],
            });
        }

        return data;
    };

    fetchDataRef = (path) => {
        console.log("Path from firebaase file : ", path);
        if (path === null || path === "/") {
            console.log("sending root reference ");
            return firebase.database().ref();
        } else {
            return firebase.database().ref(path);
        }
    };

    getDatabaseData = async () => {
        return new Promise((resolve, reject) => {
            const databaseRef = firebase.database().ref();
            databaseRef.on("value", (snapshot) => {
                resolve(snapshot.val());
            });
        });
    };

    setData = async (data) => {
        return new Promise((resolve, reject) => {
            const databaseRef = firebase.database().ref();
            databaseRef.set(data, (error) => {
                if (error) {
                    reject(this._handleError(error));
                } else {
                    resolve(true);
                }
            });
        });
    };

    uploadImageGetURL = async (imageFile, path) => {
        return new Promise((resolve, reject) => {
            const storageRef = firebase.storage().ref(path);
            const uploadTask = storageRef.put(imageFile);

            uploadTask.on(
                firebase.storage.TaskEvent.STATE_CHANGED,
                (snapshot) => {
                    // Optional: Handle progress updates
                },
                (error) => {
                    // Handle unsuccessful uploads
                    reject(this._handleError(error));
                },
                () => {
                    // Handle successful uploads on complete
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
            );
        });
    };

    updateHomePageData = async (homeData) => {
        return new Promise((resolve, reject) => {
            const updateData = async () => {
                const databaseRef = firebase.database().ref().child("home");

                try {
                    // Wait for all image uploads to complete
                    // if heroImage1File has data then upload it to firebase storage and get the url
                    if (homeData.hero.image1File) {
                        const heroImage1URL = await this.uploadImageGetURL(homeData.hero.image1File, "home/hero/heroImage1.jpg");
                        homeData.hero.image1 = heroImage1URL;
                        homeData.hero.image1File = "";
                    }

                    // if heroImage2File has homeData then upload it to firebase storage and get the url
                    if (homeData.hero.image2File) {
                        const heroImage2URL = await this.uploadImageGetURL(homeData.hero.image2File, "home/hero/heroImage2.jpg");
                        homeData.hero.image2 = heroImage2URL;
                        homeData.hero.image2File = "";
                    }

                    // if aboutImageFile has homeData then upload it to firebase storage and get the url
                    await Promise.all(
                        Object.values(homeData.aboutUs).map(async (about) => {
                            if (about.imageFile) {
                                const aboutImageURL = await this.uploadImageGetURL(about.imageFile, `home/aboutUs/${about.id}.jpg`);
                                homeData.aboutUs[about.id].image = aboutImageURL;
                                homeData.aboutUs[about.id].imageFile = "";
                            }
                        })
                    );

                    databaseRef.set(homeData, (error) => {
                        if (error) {
                            console.log("Error : ", error);
                            reject(this._handleError(error));
                        } else {
                            resolve(this.getDatabaseData());
                        }
                    });
                } catch (error) {
                    reject(this._handleError(error));
                }
            };

            updateData().catch(reject);
        });
    };

    updateEventsData = async (eventsData) => {
        return new Promise((resolve, reject) => {
            const updateData = async () => {
                const databaseRef = firebase.database().ref().child("event").child("events");

                try {
                    // Wait for all image uploads to complete
                    await Promise.all(
                        Object.values(eventsData).map(async (event) => {
                            if (event.imageFile) {
                                const eventImageURL = await this.uploadImageGetURL(event.imageFile, `event/${event.id}.jpg`);
                                eventsData[event.id].image = eventImageURL;
                                eventsData[event.id].imageFile = "";
                            }
                        })
                    );

                    // Set the updated eventsData in the database
                    databaseRef.set(eventsData, (error) => {
                        if (error) {
                            reject(this._handleError(error));
                        } else {
                            resolve(this.getDatabaseData());
                        }
                    });
                } catch (error) {
                    reject(this._handleError(error));
                }
            };

            updateData().catch(reject);
        });
    };

    updateContactData = async (contactData) => {
        return new Promise((resolve, reject) => {
            const updateData = async () => {
                const databaseRef = firebase.database().ref().child("contact");

                try {
                    // Wait for all image uploads to complete
                    if (contactData.imageFile) {
                        const imageURL = await this.uploadImageGetURL(contactData.imageFile, "contact/contactHero.jpg");
                        contactData.image = imageURL;
                        contactData.imageFile = "";
                    }

                    databaseRef.set(contactData, (error) => {
                        if (error) {
                            reject(this._handleError(error));
                        } else {
                            resolve(this.getDatabaseData());
                        }
                    });
                } catch (error) {
                    reject(this._handleError(error));
                }
            };

            updateData().catch(reject);
        });
    };

    updateAboutData = async (aboutData) => {
        return new Promise((resolve, reject) => {
            const updateData = async () => {
                const databaseRef = firebase.database().ref().child("about");

                try {
                    // Wait for all image uploads to complete
                    if (aboutData.imageFile) {
                        const imageURL = await this.uploadImageGetURL(aboutData.imageFile, "about/aboutHero.jpg");
                        aboutData.image = imageURL;
                        aboutData.imageFile = "";
                    }

                    databaseRef.set(aboutData, (error) => {
                        if (error) {
                            reject(this._handleError(error));
                        } else {
                            resolve(this.getDatabaseData());
                        }
                    });
                } catch (error) {
                    reject(this._handleError(error));
                }
            };

            updateData().catch(reject);
        });
    };

    /**
     * Handle the error
     * @param {*} error
     */
    _handleError(error) {
        // var errorCode = error.code;
        var errorMessage = error.message;
        return errorMessage;
    }
}

let _fireBaseBackend = null;

/**
 * Initialize the backend
 * @param {*} config
 */
const initFirebaseBackend = (config) => {
    if (!_fireBaseBackend) {
        _fireBaseBackend = new FirebaseAuthBackend(config);
    }
    return _fireBaseBackend;
};

/**
 * Returns the firebase backend
 */
const getFirebaseBackend = () => {
    return _fireBaseBackend;
};

export { initFirebaseBackend, getFirebaseBackend };
