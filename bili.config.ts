import { Config } from 'bili'

const config: Config = {
	input: [
		{ index: './lib/index.ts' }
	],
	output: {
		format: ['cjs', 'esm']
	}
}

export default config
