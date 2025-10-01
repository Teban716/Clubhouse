import { writable } from 'svelte/store';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '../firebase';

interface AuthState {
  isLoading: boolean;
  currentUser: User | null;
  error: string | null;
  isAdmin: boolean;
}

function createAuthStore() {
  const { subscribe, set } = writable<AuthState>({ 
    isLoading: true, 
    currentUser: null,
    error: null,
    isAdmin: false
  });

  onAuthStateChanged(auth, async (user) => {
    let isAdmin = false;
    if (user) {
      try {
        const idTokenResult = await user.getIdTokenResult();
        isAdmin = !!idTokenResult.claims.admin;
      } catch (error) {
        console.error("Error fetching admin claims:", error);
      }
    }
    set({ isLoading: false, currentUser: user, error: null, isAdmin });
  });

  return {
    subscribe,
  };
}

export const authStore = createAuthStore();
