import { forceClass } from "../particleSystem";
import { particleSystemData } from "../particleSystemData";

export class ageForce implements forceClass{

    private amount: number = 0.99;
    
    constructor(amount: number = 0.01){
        this.amount = amount;
    }
    calculate(pSysData: particleSystemData, particleIndex: number, delta: number): void {
        delta
        let particleCustomProperties = pSysData.particleCustomProperties[particleIndex];
        particleCustomProperties.age += this.amount;
        if(particleCustomProperties.age > particleCustomProperties.lifeTime){
            particleCustomProperties.alive = false;
        }
    }
}