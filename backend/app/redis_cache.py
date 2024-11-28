import redis

# Initialize Redis client
redis_client = redis.StrictRedis(host='localhost', port=6379, decode_responses=True)

def get_cache(key: str):

    return redis_client.get(key)

def set_cache(key: str, value: str):
    redis_client.setex(key, 3600, value)
