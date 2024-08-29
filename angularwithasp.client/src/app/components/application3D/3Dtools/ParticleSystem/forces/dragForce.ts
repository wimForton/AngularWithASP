import { forceClass } from "../particleSystem";
import { particleSystemData } from "../particleSystemData";

export class dragForce implements forceClass{

    private amount: number = 0.99;
    
    constructor(amount: number = 0.99){
        this.amount = amount;
    }
    calculate(pSysData: particleSystemData, particleIndex: number, delta: number): void {
        delta
        let particleCustomProperties = pSysData.particleCustomProperties[particleIndex];
    
        particleCustomProperties.velocity[0] *= particleCustomProperties.drag * this.amount;
        particleCustomProperties.velocity[1] *= particleCustomProperties.drag * this.amount;
    }
}