# comment

Streaming HTML comment parser

## Install

```
npm install commment --save
```

## Usage

```js
var fs = require('fs');
var comment = require('comment');

fs.createReadStream('/path/to/file')
	.pipe(comment(/* options */))
  .pipe(process.stdout);

```

## API

### comment([options])

* `options` - (soon)

### comment.parse(filepath, function (err, data) {})

Parse comments in a file.

* `filepath`

## Run Tests

```
npm install
npm test
```