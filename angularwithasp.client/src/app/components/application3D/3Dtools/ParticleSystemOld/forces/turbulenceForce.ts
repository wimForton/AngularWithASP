import { noise } from "../../tools/noise";
import { forceClass } from "../particleSystem";
import { particleSystemData } from "../particleSystemData";

export class turbulenceForce implements forceClass{

    private Noise: noise;
    private frame: number = 0;
    private animationSpeed: number = 0;
    private power: number = 20;
    
    constructor(animationSpeed: number = 0.0001, power: number = 20, size: number = 20){
        this.Noise = new noise(size);
        this.animationSpeed = animationSpeed;
        this.power = power;
    }
    calculate(pSysData: particleSystemData, particleIndex: number, delta: number): void {
        
        let z_offset = this.frame * this.animationSpeed;
        let particleCustomProperties = pSysData.particleCustomProperties[particleIndex];
        let scale = 0.02;
        let forceX = this.Noise.noise(particleCustomProperties.position[0] * scale, particleCustomProperties.position[1] * scale, z_offset) - 0.5;
        let forceY = this.Noise.noise(particleCustomProperties.position[0] * scale + 123, particleCustomProperties.position[1] * scale + 456, z_offset) - 0.5;
    
        particleCustomProperties.velocity[0] += forceX * delta * this.power;
        particleCustomProperties.velocity[1] += forceY * delta * this.power;
        this.frame++;
    }
}