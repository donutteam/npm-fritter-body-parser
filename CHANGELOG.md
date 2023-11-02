## 2.0.0

* Updated various packages.
	* Also Slight internal logic tweaks to accommodate changes to `@types/formidable`.
* Removed various deprecated fields.

## 1.2.0
Added the `raw` property to the `FritterBodyParserMiddlewareBody` class. This contains the raw text of the request body.

For technical reasons, this is only available when the request's `Content-Type` is `application/json`. Otherwise, it is null.

## 1.1.3
Renaming various symbols and deprecating the old names. This is to make the library more consistent with the rest of the Fritter ecosystem.

## 1.1.2
Updating packages.

## 1.1.1
Making the options object introduced in 1.1.0 optional.

## 1.1.0
Added the ability to pass options to the underlying Formidible instance. This allows for things like setting the maximum file size.

## 1.0.3
Made the keys of parsedBody use the new `PossibleJSONData` type. This allows for better type checking when using the body parser as `unknown` was too broad.

## 1.0.2

* Fixed an issue where the body parser was checking for the wrong content type for `application/x-www-form-urlencoded` bodies.
* Removing the `src` folder from the NPM ignore to allow for better debugging.
* Updated `@fritter/core` dev dependency to v0.1.6.

## 1.0.1
Adding missing export for the `FritterBodyParserMiddlewareBody` class.

## 1.0.0
Initial release.