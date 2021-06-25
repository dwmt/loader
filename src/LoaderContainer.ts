import { Loader, OptionsType } from './Loader'

export class LoaderContainer {
	loaders: Map<string, Loader>
	constructor() {
		this.loaders = new Map<string, Loader>()
	}

	registerLoader(loaderName: string, options: OptionsType): Loader {
		if (this.loaders.get(loaderName)) {
			throw new Error('loader already exists')
		}
		const loader: Loader = new Loader(options)
		this.loaders.set(loaderName, loader)
		return loader
	}
	
	getLoader(loaderName: string): Loader {
		const loader: Loader|undefined = this.loaders.get(loaderName)
		if (!loader) {
			throw new Error('No such loader')
		}
		return loader
	}

	getLoaders (): Array<Loader> {
		return Array.from(this.loaders.values())
	}
	
	removeLoader(loaderName: string): void {
		const loader: Loader|undefined = this.loaders.get(loaderName)
		if (!loader) {
			throw new Error('No such loader')
		}
		this.loaders.delete(loaderName)
	}

}
