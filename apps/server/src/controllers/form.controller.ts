import type { Request, Response } from "express";
import z from "zod";
import { ApiError } from "../utils/ApiError";
import { GoogleGenAI } from "@google/genai";
import { FormSchema } from "../utils/zodSchemas";
import prisma from "../utils/prisma";

const ai = new GoogleGenAI({});

interface InputQuery {
	prompt: string;
}
export const CreateFormWithAI = async (
	req: Request<{}, {}, InputQuery>,
	res: Response,
) => {
	const parsed = z
		.object({
			prompt: z.string().min(2).max(100),
		})
		.safeParse(req.body);

	if (!parsed.success) {
		throw new ApiError(400, "Invalid request body", "VALIDATION_ERROR");
	}
	const response = await ai.models.generateContent({
		model: "gemini-2.5-flash",
		contents: parsed.data.prompt,
	});

	return res.status(200).json({
		output: response.text,
	});
};
// ----------------------------------------------------------------------------------------

type formDataType = z.infer<typeof FormSchema>;
export const SaveFormInDb = async (
	req: Request<{}, {}, formDataType>,
	res: Response,
) => {
	const parsed = FormSchema.safeParse(req.body);

	if (!parsed.success) {
		throw new ApiError(400, "Invalid request body", "VALIDATION_ERROR");
	}

	await prisma.form.create({
		data: {
			...parsed.data,
			questions: {
				createMany: {
					data: parsed.data.questions || [],
				},
			},
		},
	});

	return res.status(201).json({
		message: "Form saved successfully",
		form: "savedForm",
	});
};
// ----------------------------------------------------------------------------------------
