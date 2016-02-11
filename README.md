# tabe
Beautiful tape tests for browsers and cli

### Cli
![cli](https://raw.githubusercontent.com/Josenzo/tabe/master/media/tabe-cli.gif)

### Browser
![browser](https://raw.githubusercontent.com/Josenzo/tabe/master/media/tabe-browser.gif)

## Install
`npm install -g tabe`

## Cli
`tabe your_test.js`

## Browser
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>tabe browser test</title>
</head>
<body>
  <script src="../dist/tabe.js"></script>
  <script type="text/javascript">
    window.tabe.createStream( window.tape );
    window.test = window.tape; // Just an alias
  </script>
  <script>
test('My first test', (t) => {
  t.equal(true, true);
  t.end();
});
  </script>
</body>
</html>
```

## Using the api
```js
var test = require('tape');
var tabe = require('tabe');
tabe.createStream( test );

test('My first test', (t) => {
  t.equal(true, true);
  t.end();
});
```
