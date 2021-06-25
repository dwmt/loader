import { EmitterInterface } from './EmitterInterface';
import { LoaderInterface } from './LoaderInterface'

type BatchLoaderOptions = {
	loaders?: Array<LoaderInterface>,
	onActivation?: EmitterInterface,
	onTermination?: EmitterInterface
}

export class BatchLoader implements LoaderInterface {
	loaders: Array<LoaderInterface>
	active: boolean
	emitActivation?: EmitterInterface
	emitTermination?: EmitterInterface

	constructor(options: BatchLoaderOptions) {
		this.loaders = options?.loaders || new Array<LoaderInterface>();
		this.active = false

		this.emitActivation = options.onActivation
		this.emitTermination = options.onTermination
	}

	onTermination(callbackFn: EmitterInterface): void {
		this.emitTermination = callbackFn
	}
	onActivation(callbackFn: EmitterInterface): void {
		this.emitActivation = callbackFn
	}

	work(): string {
		this.active = true
		return 'asd'
	}

	terminate(): void {
		this.active = false
	}


}
