import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { useEffect } from "react";
import { fetchJsonData } from "./../utils/fetchJsonData"; // Utility function to fetch JSON data
import { getFirebaseBackend } from "./../helper/firebase_helper"; // Helper function to initialize Firebase backend

const useDatabase = create(
    devtools(
        persist(
            (set) => ({
                database: [],
                currentUser: null,
                setDatabase: (database) => set({ database }),
                setCurrentUser: async (data) => {
                    try {
                        const firebaseBackend = getFirebaseBackend();
                        const user = await firebaseBackend.loginUser(data.email, data.password);
                        if (user) {
                            localStorage.setItem("currentUser", JSON.stringify(user));
                            set({ currentUser: user });
                        }
                    } catch (error) {
                        console.error("Login failed:", error);
                    }
                },
                readDatabase: async () => {
                    try {
                        const firebaseBackend = getFirebaseBackend();
                        const data = await firebaseBackend.getDatabaseData();
                        set({ database: data });
                    } catch (error) {
                        console.error("Failed to read database:", error);
                    }
                },
                setDataToFirebase: async (data) => {
                    try {
                        const firebaseBackend = getFirebaseBackend();
                        await firebaseBackend.setData(data);
                        set({ database: data });
                    } catch (error) {
                        console.error("Failed to set data to Firebase:", error);
                    }
                },
                setHomeDataToFirebase: async (homeData) => {
                    try {
                        const firebaseBackend = getFirebaseBackend();

                        const data = await firebaseBackend.updateHomePageData(homeData);
                        set({ database: data });
                    } catch (error) {
                        console.error("Failed to set home data to Firebase:", error);
                    }
                },
                setEventsDataToFirebase: async (eventsData) => {
                    try {
                        const firebaseBackend = getFirebaseBackend();
                        const data = await firebaseBackend.updateEventsData(eventsData);
                        set({ database: data });
                    } catch (error) {
                        console.error("Failed to set events data to Firebase:", error);
                    }
                },
            }),
            {
                name: "database", // name of the item in the storage (must be unique)
            }
        ),
        { name: "DatabaseStore" } // name of the store in Redux DevTools
    )
);

const useInitializeDatabase = () => {
    useEffect(() => {
        const initializeDatabase = async () => {
            if (import.meta.env.VITE_APP_DATA_SOURCE === "json") {
                const data = await fetchJsonData("./../assets/data/SiteData.json");
                useDatabase.getState().setDatabase(data);
            } else if (import.meta.env.VITE_APP_DATA_SOURCE === "firebase") {
                const firebaseBackend = getFirebaseBackend();
                const data = await firebaseBackend.getDatabaseData();
                useDatabase.getState().setDatabase(data);
            }
        };

        initializeDatabase();
    }, []);
};

const useCurrentUser = () => {
    const currentUser = useDatabase((state) => state.currentUser);
    const setCurrentUser = useDatabase((state) => state.setCurrentUser);
    return { currentUser, setCurrentUser };
};

export { useDatabase, useInitializeDatabase, useCurrentUser };
