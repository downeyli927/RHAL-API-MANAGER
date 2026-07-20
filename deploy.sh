#!/bin/sh

# 提取 .env 中的变量 (防止因格式或空格导致的错误)
if [ -f .env ]; then
  export $(cat .env | grep -v '^#' | xargs)
fi

# 获取端口配置，如果没有则使用默认值
PROXY_PORT=${PROXY_PORT:-3099}
WEB_PORT=${WEB_PORT:-3001}
CONTAINER_NAME="rhal-api-docs"

echo "====================================="
echo "Stopping existing container..."
docker stop $CONTAINER_NAME 2>/dev/null || true
docker rm $CONTAINER_NAME 2>/dev/null || true

echo "====================================="
echo "Starting new container: $CONTAINER_NAME"
echo "Web UI Port: $WEB_PORT"
echo "AI Proxy Port: $PROXY_PORT"

docker run -d \
  --name $CONTAINER_NAME \
  --restart always \
  -v $(pwd):/app \
  -w /app \
  -p $WEB_PORT:$WEB_PORT \
  -p $PROXY_PORT:$PROXY_PORT \
  node:20-alpine \
  sh -c "export \$(cat .env | grep -v '^#' | xargs) && npm run serve -- --host 0.0.0.0 --port \${WEB_PORT:-3001} & node proxy.js"

echo "====================================="
echo "✅ Deployment complete!"
echo "Access the website at: http://$(hostname -I | awk '{print $1}'):$WEB_PORT/"
