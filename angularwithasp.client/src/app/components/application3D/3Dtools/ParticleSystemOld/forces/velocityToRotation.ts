import { forceClass } from "../particleSystem";
import { particleSystemData } from "../particleSystemData";

export class velocityToRotation implements forceClass{
    private rotationOffset: number = Math.PI * 0.5;
    constructor(rotationOffset: number = Math.PI * 0.5){
        this.rotationOffset = rotationOffset;
    }
    calculate(pSysData: particleSystemData, particleIndex: number): void {
        let particleCustomProperties = pSysData.particleCustomProperties[particleIndex];
        particleCustomProperties.rotation = this.getDirection(particleCustomProperties.velocity[0],particleCustomProperties.velocity[1]) + this.rotationOffset;
    }

    getDirection(x: number, y: number): number {
		return Math.atan2(y, x);
	}
}