## 1.1.0
Added the ability to pass options to the underlying Formidible instance. This allows for things like setting the maximum file size.

## 1.0.3
Made the keys of parsedBody use the new `PossibleJSONData` type. This allows for better type checking when using the body parser as `unknown` was too broad.

## 1.0.2

* Fixed an issue where the body parser was checking for the wrong content type for `application/x-www-form-urlencoded` bodies.
* Removing the `src` folder from the NPM ignore to allow for better debugging.
* Updated `@fritter/core` dev dependency to v0.1.6.

## 1.0.1
Adding missing export for the `FritterBodyParserBody` class.

## 1.0.0
Initial release.