//import { particleSystemData } from "./particleSystemData";

import { particleCustomProperties } from "./particleCustomProperties";

export class particlePointLoader{
    
    public pSysData: particlePositionData;
    public particlePositions: Array<Array<number>> = new Array<Array<number>>();
    constructor(jsonObject: any, sizeX: number, sizeY: number, posX: number, posY: number) {
        this.pSysData = new particlePositionData(jsonObject, sizeX, sizeY, posX, posY);
        this.particlePositions;
        
    }

}

export class particlePositionData{
    particleCustomProperties: Array<particleCustomProperties> = new Array<particleCustomProperties>();
    particlePositions: Array<Array<number>> = new Array<Array<number>>();

    constructor(jsonObject: any, sizeX: number, sizeY: number, posX: number, posY: number) {


        for (let index = 0; index < jsonObject.length; index++) {
        }
        //let positions3D = jsonObject[15][1][0][1][7][5];
        this.particlePositions = jsonObject[15][1][0][1][7][5];

        for (let index = 0; index < this.particlePositions.length; index++) {
            let pos: number[] = [0,0];
            pos[0] = this.particlePositions[index][0] * sizeX;
            pos[1] = this.particlePositions[index][1] * sizeY;
            pos[0] += posX;
            pos[1] += posY;
            this.particleCustomProperties[index] = new particleCustomProperties();
            this.particleCustomProperties[index].position = pos;
            
        }   


        //console.log("---------------------------------------positions3D:", positions3D);
    }

}