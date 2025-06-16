// src/config/redis.js
import { createClient } from 'redis';

const redis = createClient();

redis.on('error', err => {
  console.error('Erro ao conectar no Redis:', err);
});

await redis.connect();

export default redis;

// ainda tem de subir o servidor redis, ele roda no linux em segundo plano na porta 6379.