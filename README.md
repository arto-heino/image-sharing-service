# image-sharing-service
# ![image-sharing-service](https://github.com/badbull/image-sharing-service/blob/ui_dev3/NetBeansProjects/image-sharing-service/web/Logo.png)

## Install

```
Load necessary files
```

## Usage

```js
const Pageres = require('pageres');

const pageres = new Pageres({delay: 2})
	.src('yeoman.io', ['480x320', '1024x768', 'iphone 5s'], {crop: true})
	.src('todomvc.com', ['1280x1024', '1920x1080'])
	.dest(__dirname)
	.run()
	.then(() => console.log('done'));
```

## Team

[![Arto Heino](http://www.nepalchamberexpo.com/images/home/why.png)](https://github.com/badbull/) | [![Milos Berka](http://gravatar.com/avatar/48fa294e3cd41680b80d3ed6345c7b4d?s=144)](https://github.com/badbull/)
---|---
[Arto Heino](https://github.com/badbull/) | [Milos Berka](https://github.com/badbull/) | [Keni Kastinen](https://github.com/badbull/)
