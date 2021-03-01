import {EmitterInterface} from './EmitterInterface'
export interface LoaderInterface {
	terminate(uuid: string): void
	work(): string
	onActivation(activationCallback: EmitterInterface): void
	onTermination(activationCallback: EmitterInterface): void
}
