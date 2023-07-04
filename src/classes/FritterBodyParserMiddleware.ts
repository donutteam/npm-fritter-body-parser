//
// Imports
//

import type { IncomingMessage } from "node:http";

import { FritterContext, FritterMiddlewareFunction } from "@fritter/core";
import Formidable from "formidable";

import { FritterBodyParserBody } from "./FritterBodyParserBody.js";

//
// Class
//

export interface FritterBodyParserContext extends FritterContext
{
	parsedBody : FritterBodyParserBody;
}

/** A middleware that handles parsing various incoming bodies. */
export class FritterBodyParserMiddleware
{
	/** The middleware function that parses the body. */
	public readonly execute : FritterMiddlewareFunction<FritterBodyParserContext>;

	/** Constructs a new FritterBodyParserMiddleware instance. */
	public constructor()
	{
		this.execute = async (context, next) =>
		{
			//
			// Get Content Type
			//

			const contentType = context.fritterRequest.getContentType();

			//
			// Handle Content Type
			//

			switch (contentType)
			{
				case "application/www-form-urlencoded":
				case "multipart/form-data":
					context.parsedBody = await this.parseFormBody(context.nodeRequest);

					break;

				case "application/json":
					context.parsedBody = await this.parseJsonBody(context.nodeRequest);

					break;

				default:
					context.parsedBody = new FritterBodyParserBody();

					break;
			}

			//
			// Execute Next Middleware
			//

			await next();
		};
	}

	/** Gets a request body from an IncomingMessage. */
	async getBody(incomingMessage : IncomingMessage) : Promise<string>
	{
		return new Promise((resolve, reject) =>
		{
			let body = "";

			incomingMessage.on("data", (chunk) =>
			{
				body += chunk;
			});

			incomingMessage.on("error", () =>
			{
				reject(new Error("Failed to get IncomingMessage body."));
			});

			incomingMessage.on("end", () =>
			{
				resolve(body);
			});
		});
	}

	/** Parses a form body from an IncomingMessage. */
	async parseFormBody(request : IncomingMessage) : Promise<FritterBodyParserBody>
	{
		const body = new FritterBodyParserBody();

		let fields : Formidable.Fields = {};

		let files : Formidable.Files = {};

		try
		{
			const formidable = Formidable();

			[ fields, files ] = await formidable.parse(request);
		}
		catch (error)
		{
			// Note: Just ignore errors (for now?)
		}

		for (const [ key, value ] of Object.entries(fields))
		{
			if (Array.isArray(value))
			{
				body.fields[key] = value[0];
				body.fieldArrays[key] = value;
			}
			else
			{
				body.fields[key] = value;
				body.fieldArrays[key] = [ value ];
			}
		}

		for (const [ key, value ] of Object.entries(files))
		{
			if (Array.isArray(value))
			{
				// Note: Type cast because this array cannot be empty.
				body.files[key] = value[0] as Formidable.File;
				body.fileArrays[key] = value;
			}
			else
			{
				body.files[key] = value;
				body.fileArrays[key] = [ value ];
			}
		}

		return body;
	}

	/** Parses a JSON body from an IncomingMessage. */
	async parseJsonBody(request : IncomingMessage) : Promise<FritterBodyParserBody>
	{
		const body = new FritterBodyParserBody();

		try
		{
			const bodyString = await this.getBody(request);

			const bodyData = JSON.parse(bodyString);

			for (const [ key, value ] of Object.entries(bodyData))
			{
				body.fields[key] = value;
				body.fieldArrays[key] = [ value ];
			}
		}
		catch (error)
		{
			// Note: Just ignore errors (for now?)
		}

		return body;
	}
}