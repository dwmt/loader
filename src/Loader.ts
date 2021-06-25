import { generateUUID } from './UUIDGenerator'
import { EmitterInterface } from './EmitterInterface'
import { LoaderInterface } from './LoaderInterface'

export type OptionsType = {
	onActivation?: EmitterInterface,
	onTermination?: EmitterInterface
}

export class Loader implements LoaderInterface {
	workers: Map<string, boolean>
	active: boolean
	emitActivation?: EmitterInterface
	emitTermination?: EmitterInterface

	constructor (options?: OptionsType) {
		this.workers = new Map<string, boolean>()
		this.active = false
		this.emitActivation = options?.onActivation
		this.emitTermination = options?.onTermination
	}

	onActivation(callback: EmitterInterface) {
		this.emitActivation = callback
	}
	
	onTermination(callback: EmitterInterface) {
		this.emitTermination = callback
	}
	
	_workerCount(): number {
		return this.workers.size
	}
	
	_checkState () {
		const workerCount: number = this._workerCount()
		if (workerCount === 0 && this.active === true) {
			this.active = false
			if(this.emitTermination) this.emitTermination()
		}
	
		if (workerCount > 0 && this.active === false) {
			this.active = true
			if(this.emitActivation) this.emitActivation()
		}
	}
	
	work(): string {
		const uuid: string = generateUUID()
		this.workers.set(uuid, true)
		this._checkState()
		return uuid
	}
	
	terminate(uuid: string): void {
		if (!uuid) {
			throw new Error('UUID should be passed')
		}
		this.workers.delete(uuid)
		this._checkState()
	}
	
	reset (): void {
		this.workers.clear()
		this._checkState()
	}
}
