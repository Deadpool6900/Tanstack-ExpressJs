import z from "zod";

export const QuestionTypeSchema = z.enum([
	"SHORT_ANSWER",
	"MULTIPLE_CHOICE",
	"CHECKBOXES",
	"DROPDOWN",
	"RATING",
]);
export const QuestionSchema = z.object({
	id: z.string(),
	question: z.string(),
	answer: z.string().nullable().optional(),
	type: QuestionTypeSchema,
	createdAt: z.date(),
	updatedAt: z.date(),
	formId: z.string(),
});

export const FormSchema = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string().nullable().optional(),
	ownerId: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
	questions: z.array(QuestionSchema).optional(), // optional if you’re only validating the form structure
});
