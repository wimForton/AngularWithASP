import { forceClass } from "../particleSystem";
import { particleSystemData } from "../particleSystemData";

export class bounceFloorForce implements forceClass{

    private floorPosition: number = -540;
    
    constructor(floorPosition: number = 540){
        this.floorPosition = floorPosition;
    }
    calculate(pSysData: particleSystemData, particleIndex: number, delta: number): void {
        delta
        let particleCustomProperties = pSysData.particleCustomProperties[particleIndex];
        //if(particleIndex == 0)console.log(particleCustomProperties.position[1])
        if(particleCustomProperties.position[1] > this.floorPosition){
            particleCustomProperties.velocity[1] *= -0.99;
            particleCustomProperties.velocity[0] *= 3;
            particleCustomProperties.position[1] = this.floorPosition - 20;
            particleCustomProperties.spin *= 1.5;
            particleCustomProperties.animationSpeed = Math.min(particleCustomProperties.animationSpeed * 1.5, 4);

        }
    }
}