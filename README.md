## Steps to Run

#### Install Dependencies
```
npm run install
```

#### Start App

**To run without docker**:
```
npm run start
```

**To run with docker**
```
docker build -t APP_NAME
```

Followed by 

```
docker run \
    -it \
    --rm \
    -v ${PWD}:/app \
    -v /app/node_modules \
    -p 3001:3000 \
    -e CHOKIDAR_USEPOLLING=true \
    APP_NAME
```
