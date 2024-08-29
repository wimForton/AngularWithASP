import { emitClass } from "../particleSystem";
import { particleSystemData } from "../particleSystemData";
import { MinMaxRandomize, MinMaxRandomizeArray } from "../particleUtils";


export class emitFromBox implements emitClass{

    constructor(){
    }

    emit(pSysData: particleSystemData, i: number): void {
    let particleProperties = pSysData.particleCustomProperties[i]

    particleProperties.position[0] = pSysData.emitPositionMin[0] + Math.random() * (pSysData.emitPositionMax[0] - pSysData.emitPositionMin[0]);
    particleProperties.position[1] = pSysData.emitPositionMin[1] + Math.random() * (pSysData.emitPositionMax[1] - pSysData.emitPositionMin[1]);

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


