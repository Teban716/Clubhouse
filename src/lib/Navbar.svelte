<script lang="ts">
  import { authStore } from './stores/authStore';
  import { auth } from './firebase';
  import { signOut } from 'firebase/auth';

  export let onOpenModal: () => void;
</script>

<nav>
  <div class="brand">Clubhouse Caps</div>
  <div class="auth-links">
    {#if $authStore.currentUser}
      <span class="user-name">{$authStore.currentUser.displayName || $authStore.currentUser.email}</span>
      <button on:click={() => signOut(auth)}>Cerrar sesión</button>
    {:else}
      <button on:click={onOpenModal}>Iniciar sesión</button>
    {/if}
  </div>
</nav>

<style>
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #121212;
    border-bottom: 1px solid rgba(138, 43, 226, 0.2);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .brand {
    font-weight: 600;
    font-size: 1.5rem;
    color: #EAEAEA;
  }

  .auth-links {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .user-name {
    color: #EAEAEA;
    font-size: 0.9rem;
    font-weight: 600;
  }

  button {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    background: transparent;
    color: #EAEAEA;
    border: 1px solid #8A2BE2;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
  }

  button:hover {
    background-color: #8A2BE2;
    color: #fff;
    box-shadow: 0 0 10px rgba(138, 43, 226, 0.5);
  }
</style>
