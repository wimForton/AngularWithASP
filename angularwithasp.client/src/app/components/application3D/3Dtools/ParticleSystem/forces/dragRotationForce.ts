import { forceClass } from "../particleSystem";
import { particleSystemData } from "../particleSystemData";

export class dragRotationForce implements forceClass{

    private amount: number = 0.99;
    
    constructor(amount: number = 0.99){
        this.amount = amount;
    }
    calculate(pSysData: particleSystemData, particleIndex: number, delta: number): void {
        delta
        let particleCustomProperties = pSysData.particleCustomProperties[particleIndex];
    
        particleCustomProperties.spin *= this.amount;
    }
}