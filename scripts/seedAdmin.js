import admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { promises as fs } from 'fs';
import path from 'path';

// --- Configuración ---
const ADMIN_EMAIL = 'admin@gmail.com';
const ADMIN_PASSWORD = 'Admin123*';
const SERVICE_ACCOUNT_KEY_PATH = path.resolve(process.cwd(), 'scripts', 'serviceAccountKey.json');
// -------------------

async function main() {
  console.log('--- Iniciando script para crear usuario admin ---');

  // 1. Cargar la clave de la cuenta de servicio
  let serviceAccount;
  try {
    const keyFile = await fs.readFile(SERVICE_ACCOUNT_KEY_PATH, 'utf8');
    serviceAccount = JSON.parse(keyFile);
    console.log('Clave de cuenta de servicio cargada correctamente.');
  } catch (error) {
    console.error(`ERROR: No se pudo encontrar o leer el archivo 'serviceAccountKey.json' en la ruta:`);
    console.error(SERVICE_ACCOUNT_KEY_PATH);
    console.error('Por favor, descarga la clave desde la consola de Firebase y colócala en la carpeta /scripts.');
    process.exit(1);
  }

  // 2. Inicializar el SDK de Admin
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    console.log('SDK de Firebase Admin inicializado.');
  } catch (error) {
    console.error('ERROR: No se pudo inicializar el SDK de Admin. ¿Es válida la clave de servicio?', error);
    process.exit(1);
  }

  const auth = getAuth();
  let uid;

  // 3. Buscar o crear el usuario admin
  try {
    // Intentar obtener el usuario por email
    const userRecord = await auth.getUserByEmail(ADMIN_EMAIL);
    uid = userRecord.uid;
    console.log(`El usuario '${ADMIN_EMAIL}' ya existe con UID: ${uid}`);
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      console.log(`Usuario '${ADMIN_EMAIL}' no encontrado. Creando nuevo usuario...`);
      try {
        const newUserRecord = await auth.createUser({
          email: ADMIN_EMAIL,
          password: ADMIN_PASSWORD,
          emailVerified: true,
        });
        uid = newUserRecord.uid;
        console.log(`Usuario '${ADMIN_EMAIL}' creado exitosamente con UID: ${uid}`);
      } catch (createError) {
        console.error(`ERROR: No se pudo crear el usuario.`, createError);
        process.exit(1);
      }
    } else {
      console.error('ERROR: Ocurrió un error al buscar el usuario.', error);
      process.exit(1);
    }
  }

  // 4. Asignar el Custom Claim de admin
  try {
    await auth.setCustomUserClaims(uid, { admin: true });
    console.log(`¡Éxito! Se asignó el rol de administrador (claim { admin: true }) al usuario ${ADMIN_EMAIL}.`);
    console.log('--- Script finalizado ---');
    process.exit(0);
  } catch (error) {
    console.error('ERROR: No se pudieron asignar los claims de administrador.', error);
    process.exit(1);
  }
}

main();