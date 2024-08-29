
import { forceClass } from "../particleSystem";
import { particleSystemData } from "../particleSystemData";

export class gravityForce implements forceClass{

    private gravity: number[] = [0,-1];
    
    constructor(gravity: number[] = [0,-1]){
        this.gravity = gravity;
    }
    calculate(pSysData: particleSystemData, particleIndex: number, delta: number): void {
        delta
        let particleCustomProperties = pSysData.particleCustomProperties[particleIndex];
    
        particleCustomProperties.velocity[0] += this.gravity[0] * delta;
        particleCustomProperties.velocity[1] += this.gravity[1] * delta;
    }
}