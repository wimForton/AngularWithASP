import { forceClass } from "./../particleSystem";
import { particleSystemData } from "./../particleSystemData";
//import { vector2D } from "./../../tools/vector";

export class bounceCircleForce implements forceClass{

    private circlePosition: number[] = [0,0];
    private radius: number = 10;
    
    constructor(circlePosition: number[] = [960,540], radius: number = 500){
        this.circlePosition = circlePosition;
        this.radius = radius;
        this.circlePosition;
        this.radius;
    }
    calculate(pSysData: particleSystemData, particleIndex: number, delta: number): void {
        //delta
        //let test: vector2D = new vector2D([20,20])
        //let particleCustomProperties = pSysData.particleCustomProperties[particleIndex];
        ////let velocity: vector2D = new vector2D(particleCustomProperties.velocity)
        //let particlePos: vector2D = new vector2D(particleCustomProperties.position);
        //let circlePos: vector2D = new vector2D(this.circlePosition);
        //if(particleIndex == 10)console.log(particlePos.getSubtract(test, circlePos).getPos());
        //let localvector: vector2D =  particlePos.getSubtract(particlePos, circlePos);
        //if(localvector.Magnitude() >= this.radius){
        //    particleCustomProperties.velocity = localvector.getMultiplyByNumber(localvector, -0.02).getPos();
        //}


    }

}
