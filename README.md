# Comebuyn_v2

Currently hosted at https://comebuyn-210014.firebaseapp.com/

## Dependancies

1. Nodejs
2. Angular CLI

Install node packages for project using:
```
npm install
```

## Deployment

Ensure firebase tools is installed 

```
firebase --version
```
   Otherwise install using node package manager:
```
npm install -g firebase-tools
```

Login to google 
```
firebase login
```

Build the project with production flag
```
ng build --prod
```

Deploy
```
firebase deploy
```



