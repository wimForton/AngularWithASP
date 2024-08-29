import { emitClass } from "../particleSystem";
import { particleSystemData } from "../particleSystemData";
import { MinMaxRandomize, MinMaxRandomizeArray } from "../particleUtils";


export class emitFromJson implements emitClass{
    public startPositions: Array<Array<number>> = new Array<Array<number>>();
    constructor(jsonObject: any, sizeX: number, sizeY: number, posX: number, posY: number) {
        for (let index = 0; index < jsonObject.length; index++) {
        }
        this.startPositions = jsonObject[15][1][0][1][7][5];

        for (let index = 0; index < this.startPositions.length; index++) {
            let pos: number[] = [0,0];
            pos[0] = this.startPositions[index][0] * sizeX;
            pos[1] = this.startPositions[index][1] * sizeY;
            pos[0] += posX;
            pos[1] += posY;
            
        }
    }
    emit(pSysData: particleSystemData, i: number){
        if(this.startPositions.length > 0){
            let particleProperties = pSysData.particleCustomProperties[i]
            let maxIndex = this.startPositions.length;
            let startPositionIndex = i%maxIndex;
            let xPos = this.startPositions[startPositionIndex][0];
            let yPos = this.startPositions[startPositionIndex][1];
            particleProperties.position[0] = xPos;
            particleProperties.position[1] = yPos;
    
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
}


