import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { useEffect } from 'react';
import { fetchJsonData } from './../utils/fetchJsonData'; // Utility function to fetch JSON data


const useDatabase = create(devtools(
    persist(
        (set) => ({
            database: [],
            setDatabase: (database) => set({ database }),
        }),
        {
            name: 'database',
        }
    )
));

const useInitializeDatabase = () => {
    useEffect(() => {
        const initializeDatabase = async () => {
            if (import.meta.env.VITE_APP_DATA_SOURCE === 'json') {
                const data = await fetchJsonData('./../assets/data/SiteData.json');
                //console.log(data);
                useDatabase.getState().setDatabase(data);
            }
        };
        initializeDatabase();
    }, []);
};

const useStore = create((set) => ({
    bears: 0,
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
    updateBears: (newBears) => set({ bears: newBears }),
}));

export { useStore };

export { useDatabase, useInitializeDatabase };

