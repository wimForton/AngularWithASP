import { particleCustomProperties } from "./particleCustomProperties";
import { particlePointLoader } from "./particlePointLoader";
import { particleSystem } from "./particleSystem";
import { particleSystemData } from "./particleSystemData";
import { MinMaxRandomize, MinMaxRandomizeArray } from "./particleUtils";

export function updatePosition(pSysData: particleSystemData, particleNum: number){
    let particleCustomProperties = pSysData.particleCustomProperties[particleNum];
    particleCustomProperties.position[0] += particleCustomProperties.velocity[0];
    particleCustomProperties.position[1] += particleCustomProperties.velocity[1];
}

export function flyAround(pSysData: particleSystemData, i: number, delta: number){
    let particleCustomProperties = pSysData.particleCustomProperties[i];
    if(pSysData.pSystemFrame%10 == 1){
        particleCustomProperties.addDirection += (Math.random() - 0.5) * 0.05;
    }
    if(pSysData.pSystemFrame%60 == 1){
        particleCustomProperties.addDirection = (Math.random() - 0.5) * 0.05;
        
    }
    particleCustomProperties.addDirection *= 1.035;
    particleCustomProperties.direction += particleCustomProperties.addDirection;
    //let particle = pSysData.particleArray[i];
    let direction = particleCustomProperties.direction;
    let speed = particleCustomProperties.speed * 2;

    let movePosDirectionalX = Math.sin(direction) * (speed * delta) + pSysData.gravity[0];
    let movePosDirectionalY = Math.cos(direction) * (speed * delta) + pSysData.gravity[1];
    
    particleCustomProperties.velocity[0] = movePosDirectionalX;
    particleCustomProperties.velocity[1] = movePosDirectionalY;

    if(pSysData.killParticles){
        let ageNormalized = particleCustomProperties.age / particleCustomProperties.lifeTime;
        let fadeInVal =  Math.min(ageNormalized / pSysData.fadeInOutTime[0], 1);
        let fadeOutVal =  Math.min((1-ageNormalized) / (1-pSysData.fadeInOutTime[1]), 1);
        let sizeInVal =  Math.min(ageNormalized / pSysData.fadeInOutSize[0], 1);
        let sizeOutVal =  Math.min((1-ageNormalized) / (1-pSysData.fadeInOutSize[1]), 1);
        particleCustomProperties.scale[0] = particleCustomProperties.startsize * sizeInVal * sizeOutVal;
        particleCustomProperties.scale[1] = particleCustomProperties.startsize * sizeInVal * sizeOutVal;
        //particleCustomProperties.scale = [0.2,0.2];
        particleCustomProperties.alpha = particleCustomProperties.startAlpha * fadeInVal * fadeOutVal;
    }
    particleCustomProperties.scale[0] = particleCustomProperties.startsize;
    particleCustomProperties.scale[1] = particleCustomProperties.startsize;
    //particle.scale = pSysData.fadeInOutTime



    //rotation
    if(pSysData.alignToDirection){particleCustomProperties.rotation = -direction + Math.PI;}
    else {particleCustomProperties.rotation += particleCustomProperties.spin;}

    //wrap around like packman if(pSysData.)
    if(pSysData.borderWrap)borderWrap(pSysData, particleCustomProperties);
    if(pSysData.borderBounce)borderBounce(pSysData, particleCustomProperties);

    if(pSysData.killParticles){particleCustomProperties.age += 0.01}
}
export function borderBounce(pSysData: particleSystemData, particleCustomProperties: particleCustomProperties){
    if(particleCustomProperties.position[0] < pSysData.displaySizeMin[0]){
        particleCustomProperties.velocity[0] *= -1  * particleCustomProperties.bounce;
        particleCustomProperties.direction = Math.PI * 0.5;;
    }
    if(particleCustomProperties.position[0] > pSysData.displaySizeMax[0]){
        particleCustomProperties.velocity[0] *= -1  * particleCustomProperties.bounce;
        particleCustomProperties.direction = Math.PI * -0.5;
    }
    if(particleCustomProperties.position[1] < pSysData.displaySizeMin[1]){
        particleCustomProperties.velocity[1] *= -1  * particleCustomProperties.bounce;
        particleCustomProperties.direction = 0;
    }
    if(particleCustomProperties.position[1] > pSysData.displaySizeMax[1]){
        particleCustomProperties.velocity[1] *= -1  * particleCustomProperties.bounce;
        particleCustomProperties.direction = Math.PI;
    }
}
export function borderWrap(pSysData: particleSystemData, particleCustomProperties: particleCustomProperties){
    if(particleCustomProperties.position[0] > pSysData.displaySizeMax[0] + 20){
        particleCustomProperties.position[0] = particleCustomProperties.position[0] - pSysData.displaySizeMax[0] - 10;
    }
    if(particleCustomProperties.position[0] < -20){
        particleCustomProperties.position[0] = particleCustomProperties.position[0] + pSysData.displaySizeMax[0] + 10;
    }
    if(particleCustomProperties.position[1] > pSysData.displaySizeMax[1] + 20){
        particleCustomProperties.position[1] = particleCustomProperties.position[1] - pSysData.displaySizeMax[1] - 10;
    }
    if(particleCustomProperties.position[1] < -20){
        particleCustomProperties.position[1] = particleCustomProperties.position[1] + pSysData.displaySizeMax[1] + 10;
    }
}

export function lerp (start: number, end: number, weight: number){
    return (1-weight)*start+weight*end;
  }

export function reset(pSysData: particleSystemData, i: number){
    //var particle = pSysData.particleArray[i];
    let particleProperties = pSysData.particleCustomProperties[i]
    //let parentParticleSystem = pSysData.parentParticleSystem;
    if(pSysData.hasParentParticleSystem && pSysData.parentParticleSystem instanceof particleSystem){
        let maxIndex = pSysData.parentParticleSystem.pSysData.particleCustomProperties.length;
        let parentParticleIndex = i%maxIndex;
        let parentParticleArray: particleCustomProperties[] = pSysData.parentParticleSystem.pSysData.particleCustomProperties;
        let parentParticle = parentParticleArray[parentParticleIndex];
        let xPos = parentParticle.position[0];
        let yPos = parentParticle.position[1];
        particleProperties.position[0] = xPos;
        particleProperties.position[1] = yPos;
    }else if(pSysData.hasParentParticleSystem && pSysData.parentParticleSystem instanceof particlePointLoader){
        let maxIndex = pSysData.parentParticleSystem.pSysData.particleCustomProperties.length;
        let parentParticleIndex = i%maxIndex;
        let parentParticleArray: particleCustomProperties[] = pSysData.parentParticleSystem.pSysData.particleCustomProperties;
        let parentParticle = parentParticleArray[parentParticleIndex].position;
        let xPos = parentParticle[0];
        let yPos = parentParticle[1];
        particleProperties.position[0] = xPos;
        particleProperties.position[1] = yPos;
    }else if(pSysData.parentParticleSystem instanceof PIXI.extras.AnimatedSprite
        || pSysData.parentParticleSystem instanceof PIXI.Sprite
        || pSysData.parentParticleSystem instanceof PIXI.Container){
            //console.log("X: ", pSysData.parentParticleSystem.x);
            particleProperties.position[0] = pSysData.parentParticleSystem.x;
            particleProperties.position[1] = pSysData.parentParticleSystem.y;
    }
    else{
        particleProperties.position[0] = pSysData.emitPositionMin[0] + Math.random() * (pSysData.emitPositionMax[0] - pSysData.emitPositionMin[0]);
        particleProperties.position[1] = pSysData.emitPositionMin[1] + Math.random() * (pSysData.emitPositionMax[1] - pSysData.emitPositionMin[1]);
    }
    if(pSysData.killParticles){
        particleProperties.alpha = 0;
    }else{
        particleProperties.alpha = MinMaxRandomize(pSysData.alphaMinMax[0], pSysData.alphaMinMax[1]);
    }
    let rgb = MinMaxRandomizeArray(pSysData.tintRgbMin, pSysData.tintRgbMax); 
    particleProperties.tint = rgb;
    //particle.animationSpeed = (Math.random() - 0.5) * 10;
    let startVelocity = [(Math.random()-0.5)  * 30, Math.random()*-20.0, Math.random()-0.5];
    startVelocity[0] *= pSysData.startVelocityScale;
    startVelocity[1] *= pSysData.startVelocityScale;
    //console.log("pSysData.particleCustomProperties[i].velocity", pSysData.particleCustomProperties[i].velocity)
    //console.log("startVelocity", startVelocity);
    pSysData.particleCustomProperties[i].velocity = startVelocity;
    pSysData.particleCustomProperties[i].alive = true;
    pSysData.particleCustomProperties[i].age = 0.0;
}

export function parkOutsideWindow(pSysData: particleSystemData, i: number){
    pSysData.particleCustomProperties[i].alive = false;
    pSysData.particleCustomProperties[i].position[0] = 0;
    pSysData.particleCustomProperties[i].position[1] = 5000;
}

// export function MinMaxRandomize(min: any, max: any){
//     return min + Math.random() * (max - min);
// }
