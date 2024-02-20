import { AnswerAdapter, AnswerAdapterOption } from '@crocodile/crocodile.entity';
import { cacheExchange, Client, fetchExchange } from '@urql/core';
import { ENV_CONFIG } from '@common/common.consts';

const answerOptionsQuery = `
	query($search: String, $limit: Int, $order: OrderEnum) {
		animes(search: $search, limit: $limit, order: $order) {
			id
			name
			russian
		}
	}
`;

const client = new Client({
	url: ENV_CONFIG.SHIKIMORI_GQL_BACKEND_API_URL,
	exchanges: [ cacheExchange, fetchExchange ],
});

export class ShikimoriAnswerAdapter implements AnswerAdapter {
	public async fetchOptions(text: string): Promise<AnswerAdapterOption[]> {
		if (!text) return [];

		try {
			const result = await client.query<{
				animes: Array<{
					id: string,
					name: string,
					russian: string
				}>
			}>(answerOptionsQuery, {
				search: text,
				limit: 10,
				order: 'popularity'
			}).toPromise();

			return result.data?.animes.map((anime) => ({
				name: [ anime.name, anime.russian ].filter(Boolean).join(' | '),
				value: anime.id
			})) ?? [];
		} catch (e) {
			console.error(e);
			return [];
		}
	}
}