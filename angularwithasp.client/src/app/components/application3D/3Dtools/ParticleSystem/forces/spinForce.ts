
import { forceClass } from "../particleSystem";
import { particleSystemData } from "../particleSystemData";

export class spinForce implements forceClass{

    private minMax: number[] = [0,-1];
    
    constructor(minMax: number[] = [0,-1]){
        this.minMax = minMax;
    }
    calculate(pSysData: particleSystemData, particleIndex: number, delta: number): void {
        delta
        let particleCustomProperties = pSysData.particleCustomProperties[particleIndex];
        
        particleCustomProperties.rotation += particleCustomProperties.spin * delta * this.minMax[1];
    }
}