import { ParticleSystemData } from "./particleSystemData";



export interface force {
  (pSysData: ParticleSystemData, particleIndex: number, delta: number): void;
}
export interface forceClass {
  calculate(pSysData: ParticleSystemData, particleIndex: number, delta: number): void;
}
export interface emitClass {
  emit(pSysData: ParticleSystemData, particleIndex: number): void;
}

export class ParticleSystem {

}
