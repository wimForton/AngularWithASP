import { vector2D } from "../../tools/vector";
import { forceClass } from "../particleSystem";
import { particleSystemData } from "../particleSystemData";

export class vortexForce implements forceClass{

    private circlePosition: number[] = [0,0];
    private radius: number = 10;
    private directionOffset: number = 0;
    private power: number = 0;
    
    constructor(circlePosition: number[] = [960,540], radius: number = 500, power: number = 1, directionOffset: number = 0){
        this.circlePosition = circlePosition;
        this.directionOffset = directionOffset;
        this.radius = radius;
        this.power = power;
        this.circlePosition;
        this.radius;
    }
    calculate(pSysData: particleSystemData, particleIndex: number, delta: number): void {
        delta;

        let particleCustomProperties = pSysData.particleCustomProperties[particleIndex];
        let particlePos: vector2D = new vector2D(particleCustomProperties.position);
        let circlePos: vector2D = new vector2D(this.circlePosition);

        let localvector: vector2D =  particlePos.getSubtract(particlePos, circlePos);
        let unitVelocityVector: vector2D = localvector.getNormalized(localvector);
        unitVelocityVector.AddDirectionByAngle(Math.PI * 0.5 + this.directionOffset, true);
        unitVelocityVector.MultiplyByNumber(this.power);
        particleCustomProperties.velocity[0] += unitVelocityVector.getPos()[0];
        particleCustomProperties.velocity[1] += unitVelocityVector.getPos()[1];

    }
}