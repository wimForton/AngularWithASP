import { forceClass } from "../particleSystem";
import { particleSystemData } from "../particleSystemData";

export class randomizeDirection implements forceClass{
    constructor(){
    }
    calculate(pSysData: particleSystemData, particleIndex: number): void {
        let particleCustomProperties = pSysData.particleCustomProperties[particleIndex];
        //particleCustomProperties.scale = [0.1,0.1];
        if(pSysData.pSystemFrame%10 == 2){
            particleCustomProperties.addDirection += (Math.random() - 0.5) * 0.05;
        }
        if(pSysData.pSystemFrame%60 == 2){
            particleCustomProperties.addDirection = (Math.random() - 0.5) * 0.05;
            
        }
        particleCustomProperties.addDirection *= 1.135;
        particleCustomProperties.direction += particleCustomProperties.addDirection;
        particleCustomProperties.direction = particleCustomProperties.direction%Math.PI;
    }
}