//
// Imports
//

import Formidable from "formidable";

import { PossibleJSONData } from "../types/PossibleJSONData.js";

//
// Exports
//

export type FritterBodyParserBodySingleFields = { [key : string] : PossibleJSONData };

export type FritterBodyParserBodyArrayFields = { [key : string] : PossibleJSONData[] };

export type FritterBodyParserBodySingleFiles = { [key : string] : Formidable.File };

export type FritterBodyParserBodyArrayFiles = { [key : string] : Formidable.File[] };

/** A class representing a parsed request body. */
export class FritterBodyParserBody
{
	/** An object containing keys for each field in the body and the FIRST value with that name. */
	fields : FritterBodyParserBodySingleFields = {};

	/** An object containing keys for each field in the body and an array of ALL values with that name. */
	fieldArrays : FritterBodyParserBodyArrayFields = {};

	/** An object containing keys for each file in the body and the FIRST file with that name. */
	files : FritterBodyParserBodySingleFiles = {};

	/** An object containing keys for each file in the body and an array of ALL files with that name. */
	fileArrays : FritterBodyParserBodyArrayFiles = {};
}