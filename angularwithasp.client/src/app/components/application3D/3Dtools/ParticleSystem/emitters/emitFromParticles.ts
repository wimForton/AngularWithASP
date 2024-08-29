import { particleCustomProperties } from "../particleCustomProperties";
import { emitClass, particleSystem } from "../particleSystem";
import { particleSystemData } from "../particleSystemData";
import { MinMaxRandomize, MinMaxRandomizeArray } from "../particleUtils";


export class emitFromParticles implements emitClass{

    constructor(){
    }

    emit(pSysData: particleSystemData, i: number): void {
    let particleProperties = pSysData.particleCustomProperties[i]

    if(pSysData.hasParentParticleSystem && pSysData.parentParticleSystem instanceof particleSystem){
        let maxIndex = pSysData.parentParticleSystem.pSysData.particleCustomProperties.length;
        let parentParticleIndex = i%maxIndex;
        let parentParticleArray: particleCustomProperties[] = pSysData.parentParticleSystem.pSysData.particleCustomProperties;
        let parentParticle = parentParticleArray[parentParticleIndex];
        let xPos = parentParticle.position[0];
        let yPos = parentParticle.position[1];
        particleProperties.position[0] = xPos;
        particleProperties.position[1] = yPos;
    }

    particleProperties.alpha = MinMaxRandomize(pSysData.alphaMinMax[0], pSysData.alphaMinMax[1]);
    let rgb = MinMaxRandomizeArray(pSysData.tintRgbMin, pSysData.tintRgbMax); 
    particleProperties.tint = rgb;
    let startVelocity = [(Math.random()-0.5)  * 30, Math.random()*-20.0, Math.random()-0.5];
    startVelocity[0] *= pSysData.startVelocityScale;
    startVelocity[1] *= pSysData.startVelocityScale;
    pSysData.particleCustomProperties[i].velocity = startVelocity;
    pSysData.particleCustomProperties[i].alive = true;
    pSysData.particleCustomProperties[i].age = 0.0;
    }
}


