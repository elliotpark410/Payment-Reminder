import { createClient, RedisClientType } from 'redis';
import { getEnvVariable } from './index';

let redisClient: RedisClientType;

function getRedisClient(): RedisClientType {
  if (!redisClient) {
    const redisHost = getEnvVariable('REDIS_HOST');
    const redisPort = getEnvVariable('REDIS_PORT');

    redisClient = createClient({
      url: `redis://${redisHost}:${redisPort}`
    });

    redisClient.on('error', (err) => {
      console.error('Redis connection error:', err);
      throw new Error("Redis connection error");
    });

    redisClient.connect().catch(console.error);
  }

  return redisClient;
}


const MAX_LOGIN_ATTEMPTS = getEnvVariable('MAX_LOGIN_ATTEMPTS');
const LOCK_TIME = 30 * 60 * 1000; // 30 minutes in milliseconds

export async function checkRateLimit(username: string): Promise<{ allowed: boolean; retryAfter: number }> {
  const client = getRedisClient();
  const key = `login_attempts_${username}`;
  const attempts = await client.get(key);
  const currentTime = Date.now();

  if (!attempts) {
    return { allowed: true, retryAfter: 0 };
  }

  const loginData = JSON.parse(attempts);

  if (loginData.count >= MAX_LOGIN_ATTEMPTS) {
    const retryAfter = loginData.lockUntil - currentTime;
    if (retryAfter > 0) {
      return { allowed: false, retryAfter: retryAfter / 1000 };
    } else {
      await client.del(key);
      return { allowed: true, retryAfter: 0 };
    }
  } else {
    return { allowed: true, retryAfter: 0 };
  }
};

export async function incrementLoginAttempts(username: string) {
  const client = getRedisClient();
  const key = `login_attempts_${username}`;
  const attempts = await client.get(key);
  const currentTime = Date.now();


  if (!attempts) {
    await client.set(key, JSON.stringify({ count: 1, lockUntil: 0 }), {
      EX: Math.ceil(LOCK_TIME / 1000)
    });
  } else {
    const loginData = JSON.parse(attempts);
    loginData.count += 1;
    if (loginData.count >= MAX_LOGIN_ATTEMPTS) {
      loginData.lockUntil = currentTime + LOCK_TIME;
    }

    await client.set(key, JSON.stringify(loginData), {
      EX: Math.ceil(LOCK_TIME / 1000)
    });
  }
}

// If the password is correct, reset login attempts
export async function resetLoginAttempts(username: string) {
  const client = getRedisClient();
  await client.del(`login_attempts_${username}`);
};

