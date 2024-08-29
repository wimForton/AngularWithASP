import { forceClass } from "../particleSystem";
import { particleSystemData } from "../particleSystemData";

export class directionToForce implements forceClass{
    private globalStrength:number;
    constructor(globalStrength:number = 1){
        this.globalStrength = globalStrength;
    }
    calculate(pSysData: particleSystemData, particleIndex: number, delta: number): void {
        let particleCustomProperties = pSysData.particleCustomProperties[particleIndex];
        let direction = particleCustomProperties.direction;

        let speed = particleCustomProperties.speed;
        let movePosDirectionalX = Math.sin(direction) * delta * speed * this.globalStrength;
        let movePosDirectionalY = Math.cos(direction) * delta * speed * this.globalStrength;

        particleCustomProperties.velocity[0] += movePosDirectionalX;
        particleCustomProperties.velocity[1] += movePosDirectionalY;

    }
}