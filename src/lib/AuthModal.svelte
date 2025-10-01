<script lang="ts">
  import { auth, db } from './firebase';
  import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
  import { doc, setDoc } from "firebase/firestore";
  import { onMount, onDestroy } from 'svelte';

  export let isOpen: boolean;
  export let onClose: () => void;

  let email = '';
  let password = '';
  let confirmPassword = '';
  let name = '';
  let lastName = '';
  let phone = '';

  let isLogin = true;
  let error: string | null = null;

  function resetForm() {
    email = '';
    password = '';
    confirmPassword = '';
    name = '';
    lastName = '';
    phone = '';
    error = null;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (isOpen && e.key === 'Escape') {
      onClose();
    }
  }

  onMount(() => {
    window.addEventListener('keydown', handleKeydown);
  });

  onDestroy(() => {
    window.removeEventListener('keydown', handleKeydown);
  });

  async function handleSubmit() {
    error = null;

    if (!isLogin && password !== confirmPassword) {
      error = 'Las contraseñas no coinciden.';
      return;
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await updateProfile(user, { displayName: `${name} ${lastName}` });

        await setDoc(doc(db, "users", user.uid), {
          name,
          lastName,
          phone
        });
      }
      
      resetForm();
      onClose();

    } catch (e: any) {
      if (e.code === 'auth/email-already-in-use') {
        error = 'El usuario ya está registrado.';
      } else {
        error = e.message;
      }
    }
  }
</script>

{#if isOpen}
  <div class="modal-backdrop" on:click={onClose}>
    <div 
      class="modal-content" 
      on:click|stopPropagation 
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      tabindex="-1"
    >
      <button class="close-button" on:click={onClose}>&times;</button>
      <h2 id="modal-title">{isLogin ? 'Iniciar sesión' : 'Registrarse'}</h2>
      <form on:submit|preventDefault={handleSubmit}>
        {#if !isLogin}
          <input type="text" bind:value={name} placeholder="Nombre" required />
          <input type="text" bind:value={lastName} placeholder="Apellidos" required />
          <input type="tel" bind:value={phone} placeholder="Celular" required />
        {/if}
        <input type="email" bind:value={email} placeholder="Correo electrónico" required />
        <input type="password" bind:value={password} placeholder="Contraseña" required />
        {#if !isLogin}
        <input type="password" bind:value={confirmPassword} placeholder="Confirmar contraseña" required />
        {/if}
        <button type="submit">{isLogin ? 'Iniciar sesión' : 'Registrarse'}</button>
      </form>
      {#if error}
        <p class="error">{error}</p>
      {/if}
      
      <p class="toggle-auth-text">
        {#if isLogin}
          ¿No tienes una cuenta?
          <button type="button" class="toggle-link" on:click={() => { isLogin = false; error = null; }}>
            Regístrate
          </button>
        {:else}
          ¿Ya tienes una cuenta?
          <button type="button" class="toggle-link" on:click={() => { isLogin = true; error = null; }}>
            Inicia sesión
          </button>
        {/if}
      </p>
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal-content {
    position: relative;
    background-color: #1a1a1a;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
    width: 90%;
    max-width: 400px;
    text-align: center;
  }
  
  .modal-content:focus {
    outline: none;
  }

  .close-button {
    position: absolute;
    top: 0.5rem;
    right: 1rem;
    background: none;
    border: none;
    color: #aaa;
    font-size: 2rem;
    font-weight: 300;
    cursor: pointer;
    line-height: 1;
    padding: 0;
    transition: color 0.2s;
  }

  .close-button:hover {
    color: #fff;
  }

  h2 {
    color: #EAEAEA;
    margin-bottom: 1.5rem;
  }

  input {
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 1rem;
    border-radius: 4px;
    border: 1px solid #8A2BE2;
    background-color: #2a2a2a;
    color: #EAEAEA;
    font-family: 'Poppins', sans-serif;
  }

  button {
    width: 100%;
    padding: 0.75rem;
    border: none;
    border-radius: 4px;
    background-image: linear-gradient(to right, #8A2BE2, #4c1a82);
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
  }

  button:hover {
    box-shadow: 0 0 15px rgba(138, 43, 226, 0.6);
  }

  .toggle-auth-text {
    margin-top: 1.5rem;
    color: #aaa;
    font-size: 0.9rem;
  }

  .toggle-link {
    background: none;
    border: none;
    padding: 0;
    width: auto;
    font-family: inherit;
    font-size: inherit;
    color: #00FFFF;
    cursor: pointer;
    font-weight: 600;
    text-decoration: underline;
  }

  .toggle-link:hover {
    color: #00e0e0;
    box-shadow: none; 
  }

  .error {
    color: #ff3b3b;
    margin-top: 1rem;
  }
</style>
