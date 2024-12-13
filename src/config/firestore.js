import { Firestore } from '@google-cloud/firestore';
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import dotenv from 'dotenv';

dotenv.config();

const secretManager = new SecretManagerServiceClient();
const keyFileSecretName = 'GOOGLE_CLOUD_KEYFILE_PATH';
const keyFileSecretVersion = 'latest';

async function getKeyFile() {
  const [response] = await secretManager.accessSecretVersion({
    name: `projects/${process.env.GOOGLE_CLOUD_PROJECT_ID}/secrets/${keyFileSecretName}/versions/${keyFileSecretVersion}`,
  });
  const keyFile = response.payload.data.toString();
  return keyFile;
}

async function firestore() {
  const keyFile = await getKeyFile();
  const firestoreInit = new Firestore({
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
    database: '(default)',
    keyFile,
  });
  return firestoreInit;
}

export default firestore;