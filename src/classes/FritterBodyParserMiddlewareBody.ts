//
// Imports
//

import Formidable from "formidable";

import { PossibleJSONData } from "../types/PossibleJSONData.js";

//
// Exports
//

export type FritterBodyParserMiddlewareBodySingleFields = { [key : string] : PossibleJSONData };

export type FritterBodyParserMiddlewareBodyArrayFields = { [key : string] : PossibleJSONData[] };

export type FritterBodyParserMiddlewareBodySingleFiles = { [key : string] : Formidable.File };

export type FritterBodyParserMiddlewareBodyArrayFiles = { [key : string] : Formidable.File[] };

/** A class representing a parsed request body. */
export class FritterBodyParserMiddlewareBody
{
	/** An object containing keys for each field in the body and the FIRST value with that name. */
	fields : FritterBodyParserMiddlewareBodySingleFields = {};

	/** An object containing keys for each field in the body and an array of ALL values with that name. */
	fieldArrays : FritterBodyParserMiddlewareBodyArrayFields = {};

	/** An object containing keys for each file in the body and the FIRST file with that name. */
	files : FritterBodyParserMiddlewareBodySingleFiles = {};

	/** An object containing keys for each file in the body and an array of ALL files with that name. */
	fileArrays : FritterBodyParserMiddlewareBodyArrayFiles = {};

	/** The raw text of the request body. For technical reasons, this is only available for JSON bodies. */
	raw : string | null;
}

//
// Legacy Names
//

/** @deprecated */
export type FritterBodyParserBodySingleFields = FritterBodyParserMiddlewareBodySingleFields;

/** @deprecated */
export type FritterBodyParserBodyArrayFields = FritterBodyParserMiddlewareBodyArrayFields;

/** @deprecated */
export type FritterBodyParserBodySingleFiles = FritterBodyParserMiddlewareBodySingleFiles;

/** @deprecated */
export type FritterBodyParserBodyArrayFiles = FritterBodyParserMiddlewareBodyArrayFiles;

/** @deprecated */
export const FritterBodyParserBody = FritterBodyParserMiddlewareBody;