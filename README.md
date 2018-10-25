# Smartsecurity Web Service

## Specification

Please take your time to read the specification [here](https://smartsecuritywebservice.docs.apiary.io/).

## Instalation 

### Clone this repo
```
  git clone https://github.com/cenidetiot/smartsecurity-web-service.git
 
```

### Install requirements 
```
  npm i
```
 
### Configurations

```javascript

  //MYSQL Configurations 
  exports.mysql = {
    host : 'URL', // MySQL Host
    db : 'databasename', //Database name
    user : 'databaseuser', // Database User
    password : '*******' // Database Password
  }
  
  exports.context = "URL" // Orion URL
  exports.keyrock = "URL" //KeyRock URL
  exports.crate = 'URL'; // CrateDB Host
  
```


### Run 
```
  npm start 
```


