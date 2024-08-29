import { forceClass } from "../particleSystem";
import { particleSystemData } from "../particleSystemData";

export class windForce implements forceClass{
    private windVector: number[] = [1, 0];
    constructor(windVector: number[] = [1, 0]){
        this.windVector = windVector;
    }
    calculate(pSysData: particleSystemData, particleIndex: number, delta: number): void {
        let particleCustomProperties = pSysData.particleCustomProperties[particleIndex];

        particleCustomProperties.velocity[0] += this.windVector[0] * delta;
        particleCustomProperties.velocity[1] += this.windVector[1] * delta;

    }
}