# @dwmt/loader

[![Build Status](https://travis-ci.org/dwmt/loader.svg?branch=master)](https://travis-ci.org/dwmt/loader) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/617fcd0457e34ad39f6a2207dfbad127)](https://www.codacy.com/manual/dwmt/loader?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=dwmt/loader&amp;utm_campaign=Badge_Grade) [![codecov](https://codecov.io/gh/dwmt/loader/branch/master/graph/badge.svg)](https://codecov.io/gh/dwmt/loader) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
[![license](https://img.shields.io/github/license/dwmt/loader.svg)](LICENSE)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

Loader is a simple library for easier and more reliable way to handle loading animations. You can easily define loaders globally and handle individual loaders inside front end components or backend signaling.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Contributing](#contributing)
- [License](#license)


## Install


```
npm i @dwmt/loader
```


## Usage

You can define loaders inside a global singleton container and retrieve it from anywhere inside your application
```javascript
const LC = require('@dwmt/loader')

const globalLoader = LC.registerLoader('globalLoader')
globalLoader.reset()

// API.js

const LC = require('@dwmt/loader')

const loader = LC.getLoader('globalLoader')

const workId = loader.work()

// API slow logic

loader.terminate(workId)
```
You can also initiate loaders manually withoud the container

```javascript
const Loader = require('@dwmt/loader/lib/Loader')

const buttonLoader = new Loader()
buttonLoader.onActivation(() => {
  // show loader
})

buttonLoader.onTermination(() => {
  // hide loader
})

const workId = buttonLoader.work()

buttonLoader.terminate(workId)

```


## API


## Contributing

See [the contributing file](CONTRIBUTING.md)!

PRs accepted.

Small note: If editing the Readme, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.



## License

[MIT © dwmt.](../LICENSE)
