<script lang="ts">
  import Navbar from './lib/Navbar.svelte';
  import AuthModal from './lib/AuthModal.svelte';
  import AdminDashboard from "./lib/components/AdminDashboard.svelte";
  import ProductList from "./lib/components/ProductList.svelte";
  import { authStore } from './lib/stores/authStore';

  let isModalVisible = false;

  function openModal() {
    isModalVisible = true;
  }

  function closeModal() {
    isModalVisible = false;
  }
</script>

<Navbar onOpenModal={openModal} />
<AuthModal isOpen={isModalVisible} onClose={closeModal} />

<main>
  {#if $authStore.isLoading}
    <div class="centered-message">
      <p>Cargando aplicación...</p>
    </div>
  {:else}
    {#if $authStore.isAdmin}
      <AdminDashboard />
    {/if}
    <ProductList />
  {/if}
</main>

<style>
  :global(body) {
    font-family: 'Inter', sans-serif;
    background-color: #121212;
    color: #e0e0e0;
    margin: 0;
  }

  main {
    padding: 1rem;
  }

  .centered-message {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
  }
</style>
