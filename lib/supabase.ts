import "react-native-url-polyfill/auto";
import * as SecureStore from "expo-secure-store";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/src/database.types";

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key);
  },
};

const supabaseUrl =process.env.EXPO_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey =process.env.EXPO_PUBLIC_SUPABASE_ANON || "";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});


// import "react-native-url-polyfill/auto";
// import * as SecureStore from "expo-secure-store";
// import { createClient } from "@supabase/supabase-js";
// import { Database } from "@/src/database.types";

// // Define the ExpoSecureStoreAdapter with async handling
// const ExpoSecureStoreAdapter = {
//   // Correct method for getting an item from SecureStore
//   getItem: async (key: string) => {
//     try {
//       return await SecureStore.getItemAsync(key); // Correct method for retrieving value
//     } catch (error) {
//       console.error("Error getting item from SecureStore", error);
//       return null;
//     }
//   },

//   // Correct method for setting an item in SecureStore
//   setItem: async (key: string, value: string) => {
//     try {
//       await SecureStore.setItemAsync(key, value); // Correct method for setting value
//     } catch (error) {
//       console.error("Error setting item in SecureStore", error);
//     }
//   },

//   // Correct method for removing an item from SecureStore
//   removeItem: async (key: string) => {
//     try {
//       await SecureStore.deleteItemAsync(key); // Correct method for deleting item
//     } catch (error) {
//       console.error("Error removing item from SecureStore", error);
//     }
//   },
// };

// // Fetch Supabase credentials from environment variables
// const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || "";
// const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON || "";
// console.log(supabaseUrl,supabaseAnonKey ,"S")
// // Create Supabase client with the custom storage adapter
// export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
//   auth: {
//     storage: ExpoSecureStoreAdapter, // Use the adapter correctly without casting
//     autoRefreshToken: true,
//     persistSession: true,
//     detectSessionInUrl: false,
//   },
// });
