'use server';

import { revalidatePath } from 'next/cache';
import prisma from './db';

export async function create(prevState, formData) {
	'use server';

	try {
		const input = formData.get('input');

		await prisma.todo.create({
			data: {
				input: input,
			},
		});
		revalidatePath('/better');
	} catch (error) {
		return 'Failed to create.';
	}
}

export async function edit(formData) {
	'use server';

	const input = formData.get('input');
	const inputId = formData.get('inputId');

	await prisma.todo.update({
		where: {
			id: inputId,
		},
		data: {
			input: input,
		},
	});
	revalidatePath('/better');
}

export async function deleteItem(formData) {
	'use server';

	const inputId = formData.get('inputId');

	await prisma.todo.delete({
		where: {
			id: inputId,
		},
	});
	revalidatePath('/better');
}
