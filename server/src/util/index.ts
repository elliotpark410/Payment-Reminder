import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Retrieve an environment variable's value, or throw an error if it's not defined.
 * @param name - The name of the environment variable.
 * @returns The value of the environment variable.
 */
export const getEnvVariable = (name: string): string => {
  const value = process.env[name];
  if (value === undefined) {
    throw new Error(`Environment variable ${name} is not defined`);
  }
  return value;
}

// Crypto configuration
const algorithm = 'aes-256-cbc';
const encrpytion_key: string = getEnvVariable('ENCRYPTION_KEY');
const initialization_vector: string = getEnvVariable('ENCRYPTION_IV');

const key = Buffer.from(encrpytion_key, 'base64');
const iv = Buffer.from(initialization_vector, 'base64');

if (key.length !== 32) {
  throw new Error('Invalid encryption key length. Must be 32 bytes.');
}

if (iv.length !== 16) {
  throw new Error('Invalid initialization vector length. Must be 16 bytes.');
}

/**
 * Encrypts a text using AES-256-CBC algorithm.
 * @param text - The plain text to encrypt.
 * @returns The encrypted text.
 */
export function encrypt(text: string): string {
  let cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

/**
 * Decrypts a text using AES-256-CBC algorithm.
 * @param text - The encrypted text to decrypt.
 * @returns The decrypted text.
 */
export function decrypt(text: string): string {
  let decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(text, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}


