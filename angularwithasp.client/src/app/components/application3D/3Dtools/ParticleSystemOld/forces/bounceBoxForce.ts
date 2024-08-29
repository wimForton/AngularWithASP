import { forceClass } from "../particleSystem";
import { particleSystemData } from "../particleSystemData";

export class bounceBoxForce implements forceClass{
    private boundingBoxMin:number[] = [0,0];
    private boundingBoxMax:number[] = [1,1];
    private padding: number = 0.01;
    constructor(boundingBoxMin:number[] = [0,0], boundingBoxMax:number[] = [1,1]){
        this.boundingBoxMin = boundingBoxMin;
        this.boundingBoxMax = boundingBoxMax;
        this.boundingBoxMin;
        this.boundingBoxMax;
    }
    calculate(pSysData: particleSystemData, particleIndex: number): void {
        let particleCustomProperties = pSysData.particleCustomProperties[particleIndex];
        if(particleCustomProperties.position[0] < pSysData.displaySizeMin[0]){
            particleCustomProperties.velocity[0] *= -1  * particleCustomProperties.bounce;
            particleCustomProperties.direction = Math.PI * 0.5;
            particleCustomProperties.position[0] = pSysData.displaySizeMin[0] + this.padding;
        }
        if(particleCustomProperties.position[0] > pSysData.displaySizeMax[0]){
            particleCustomProperties.velocity[0] *= -1  * particleCustomProperties.bounce;
            particleCustomProperties.direction = Math.PI * -0.5;
            particleCustomProperties.position[0] = pSysData.displaySizeMax[0] - this.padding;
        }
        if(particleCustomProperties.position[1] < pSysData.displaySizeMin[1]){
            particleCustomProperties.velocity[1] *= -1  * particleCustomProperties.bounce;
            particleCustomProperties.direction = 0;
            particleCustomProperties.position[1] = pSysData.displaySizeMin[1] + this.padding;
        }
        if(particleCustomProperties.position[1] > pSysData.displaySizeMax[1]){
            particleCustomProperties.velocity[1] *= -1  * particleCustomProperties.bounce;
            particleCustomProperties.direction = Math.PI;
            particleCustomProperties.position[1] = pSysData.displaySizeMax[1] - this.padding;
        }

    }
}