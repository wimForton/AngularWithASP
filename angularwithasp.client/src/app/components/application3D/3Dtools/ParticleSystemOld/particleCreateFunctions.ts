
import { particleCustomProperties } from "./particleCustomProperties";
import { particleSystemData } from "./particleSystemData";
import { MinMaxRandomize } from "./particleUtils";

export function CreateParticles(pSysData: particleSystemData){
    pSysData.particleCustomProperties = [];
    //console.log("pSysData.totalParticles[0]",pSysData.totalParticles[0])
    for (var i = 0; i < pSysData.totalParticles[0]; i++) {

        let customProperties = new particleCustomProperties();
        customProperties.clipStartFrame = MinMaxRandomize(pSysData.spriteStartFrame, pSysData.spriteEndFrame);

        customProperties.alive = false;
        customProperties.delay = MinMaxRandomize(pSysData.delayMinMax[0], pSysData.delayMinMax[1]);
        customProperties.lifeTime = pSysData.lifeTimeMinMax[0] + Math.random() * (pSysData.lifeTimeMinMax[1] - pSysData.lifeTimeMinMax[0]);
        customProperties.turningSpeed = 0;
        customProperties.direction = MinMaxRandomize(pSysData.directionMinMax[0], pSysData.directionMinMax[1]);
        customProperties.startsize = MinMaxRandomize(pSysData.startSizeMinMax[0], pSysData.startSizeMinMax[1]);//pSysData.startSizeMin + Math.random() * (pSysData.startSizeMax - pSysData.startSizeMin);
        customProperties.scale = [customProperties.startsize, customProperties.startsize];
        customProperties.speed = MinMaxRandomize(pSysData.animationSpeedMinMax[0], pSysData.animationSpeedMinMax[1]);
        customProperties.spin = MinMaxRandomize(pSysData.spinMinMax[0], pSysData.spinMinMax[1]);
        customProperties.drag = pSysData.drag;
        customProperties.bounce = MinMaxRandomize(pSysData.bounceMinMax[0], pSysData.bounceMinMax[1]);
        customProperties.startAlpha = MinMaxRandomize(pSysData.alphaMinMax[0], pSysData.alphaMinMax[1]);
        pSysData.particleCustomProperties.push(customProperties);
    }
}