import NodeCache from 'node-cache';
import { getEnvVariable } from './index';

const MAX_LOGIN_ATTEMPTS = parseInt(getEnvVariable('MAX_LOGIN_ATTEMPTS'), 10);
const LOCK_TIME = 30 * 60 * 1000; // 30 minutes in milliseconds

const cache = new NodeCache();

export async function checkRateLimit(
  username: string,
): Promise<{ allowed: boolean; retryAfter: number }> {
  const key = `login_attempts_${username}`;
  const loginData = cache.get<{ count: number; lockUntil: number }>(key);
  const currentTime = Date.now();

  if (!loginData) {
    return { allowed: true, retryAfter: 0 };
  }

  if (loginData.count >= MAX_LOGIN_ATTEMPTS) {
    const retryAfter = loginData.lockUntil - currentTime;
    if (retryAfter > 0) {
      return { allowed: false, retryAfter: retryAfter / 1000 };
    } else {
      cache.del(key);
      return { allowed: true, retryAfter: 0 };
    }
  } else {
    return { allowed: true, retryAfter: 0 };
  }
}

export async function incrementLoginAttempts(username: string) {
  const key = `login_attempts_${username}`;
  const loginData = cache.get<{ count: number; lockUntil: number }>(key);
  const currentTime = Date.now();

  if (!loginData) {
    cache.set(key, { count: 1, lockUntil: 0 }, LOCK_TIME / 1000);
  } else {
    loginData.count += 1;

    if (loginData.count >= MAX_LOGIN_ATTEMPTS) {
      loginData.lockUntil = currentTime + LOCK_TIME;
    }

    cache.set(key, loginData, LOCK_TIME / 1000);
  }
}

// If the password is correct, reset login attempts
export async function resetLoginAttempts(username: string) {
  const key = `login_attempts_${username}`;
  cache.del(key);
}
