import { sliderBox } from "../tools/sliderBox";
import {particleCustomProperties} from "./particleCustomProperties";
import { particlePointLoader } from "./particlePointLoader";
import { particleSystem } from "./particleSystem";

export class particleSystemData{
    //activeGameData: CommonData;
    //particleContainer: PIXI.particles.ParticleContainer;
    particleCustomProperties: Array<particleCustomProperties>;
    numbersToControl: Array<Array<number>> = new Array<Array<number>>();
    controlMinMax:  Array<Array<number>> = new Array<Array<number>>();
    fractional:  Array<boolean> = new Array<boolean>();
    labels: Array<string> = new Array<string>();
    //particlePositions: Array<Array<number>> = new Array<Array<number>>();
    pSystemTime: number = 0;
    pSystemFrame: number = 0;
    totalParticles: number[] = [5];
    imageName: string;
    spriteStartFrame: number;
    spriteEndFrame: number;
    startSizeMinMax: number[];
    startRotation: number = 0;
    recycleParticles = false;
    killParticles = false;
    fadeInOutTime: number[] = [0.1, 0.9];
    fadeInOutSize: number[] = [1.0, 1.0];
    borderWrap = true;
    borderBounce = true;
    bounceMinMax: number[] = [1, 1];
    directionVelocityMix = 0.5;
    alignToDirection = true;
    directionMinMax: number[] = [0,0];
    gravity: number[] = [0,0];
    drag: number = 0;
    speedMinMax: number[] = [0.1, 1.0];
    animationSpeedMinMax: number[] = [0.1, 1.0];
    particleSizeMultiplier: number = 1;
    particleBehavior: string = "bounceAround_";
    startVelocityScale: number = 1;
    spinMinMax: number[] = [-1, 1];
    displaySizeMin: Array<number>;
    displaySizeMax: Array<number>;
    //floorLevel: number;
    emitPositionMin: number[] = [0,0];
    emitPositionMax: number[] = [1,1];
    delayMinMax: number[] = [0, 0];
    lifeTimeMinMax: number[] = [1,2];
    parentParticleSystem: particleSystem | particlePointLoader | PIXI.extras.AnimatedSprite | PIXI.Sprite | PIXI.Container;
    hasParentParticleSystem: boolean;
    alphaMinMax: number[] = [0.5,1.0];
    tintRgbMin: number[] = [1.0, 1.0, 1.0];
    tintRgbMax: number[] = [1.0, 1.0, 1.0];
    //followSprite: boolean;

    sliderBox: sliderBox;
    boxPos: number[] = [0, 100];

    constructor(jsonObject?: any){
        if(jsonObject!== undefined){
            this.setParticleData(jsonObject)
        }else{
            this.setDefault();
        }

        //this.sliderBox = new sliderBox(this.sliderContainer, ticker, this.boxPos);
        this.createControlArrays();
    }

    public sliderBoxVisible(bool: boolean){
        bool
        //this.sliderBox.sliderBoxVisible(bool);
    }


    private createControlArrays(){
        //console.log("this.tintRgbMin, this.tintRgbMax",this.tintRgbMin, this.tintRgbMax);
        // this.sliderBox.addSliderData(this.tintRgbMin, [0,1], true, "tintRgbMin")
        // this.sliderBox.addSliderData(this.tintRgbMax, [0,1], true, "tintRgbMax")
        // this.sliderBox.addSliderData(this.fadeInOutTime, [0,1], true, "fadeInOutTime")
        // this.sliderBox.addSliderData(this.fadeInOutSize, [0,1], true, "fadeInOutSize")
        // this.sliderBox.addSliderData(this.emitPositionMin, [0,1920], false, "emitPositionMin")
        // this.sliderBox.addSliderData(this.emitPositionMax, [0,1920], false, "emitPositionMax")
        // this.sliderBox.addSliderData(this.totalParticles, [0,1000], false, "totalParticles")
        // this.sliderBox.addSliderData(this.startSizeMinMax, [0,4], true, "startSizeMinMax")
        // this.sliderBox.buildSliderBox();

    }


    private setDefault(){
        this.totalParticles = [6];
        this.imageName = "yellyfishBG";
        this.spriteStartFrame = 0;
        this.spriteEndFrame = 30;
        //this.behavior = "flyAround";
        this.borderWrap = false;
        this.borderBounce = true;
        this.bounceMinMax = [1, 1];
        this.recycleParticles = false;
        this.killParticles = false;
        this.fadeInOutTime = [0.1, 0.9];
        this.fadeInOutSize = [0.01, 1.0];
        this.emitPositionMin = [0.01, 0.01];
        this.emitPositionMax = [0.99, 0.99];
        this.directionVelocityMix = 0.0;
        //this.turningSpeed = 0;
        this.directionMinMax = [0.0,360.0];
        this.alignToDirection = true;
        this.delayMinMax = [0.0,1.0];
        //this.age = 0;
        this.lifeTimeMinMax = [0.5, 1.6];
        this.gravity = [0.0,0.0];
        this.drag = 0.998;
        //this.velocity = [0, 0];
        this.startVelocityScale = 1;
        this.speedMinMax = [1.0, 1.0];
        this.animationSpeedMinMax = [1.0, 1.0];
        this.startSizeMinMax = [0.2,0.4];
        this.particleSizeMultiplier = 1.0;
        this.spinMinMax = [-0.1, 0.1];
        this.alphaMinMax = [1, 1];
        this.tintRgbMin = [0.0, 0.5, 1.0];
        this.tintRgbMax = [1.0, 1.0, 1.0];
    }

    private setParticleData(jsonObject?: any){
        this.totalParticles = jsonObject.totalParticles;
        this.imageName = jsonObject.imageName;
        this.spriteStartFrame = jsonObject.spriteStartFrame;
        this.spriteEndFrame = jsonObject.spriteEndFrame;
        this.startSizeMinMax = jsonObject.startSizeMinMax;
        this.recycleParticles = jsonObject.recycleParticles;
        this.killParticles = jsonObject.killParticles;
        this.fadeInOutTime = jsonObject.fadeInOutTime;
        this.fadeInOutSize = jsonObject.fadeInOutSize;
        this.borderWrap = jsonObject.borderWrap;
        this.borderBounce = jsonObject.borderBounce;
        this.bounceMinMax = jsonObject.bounceMinMax;
        this.particleBehavior = jsonObject.behavior;
        this.delayMinMax = jsonObject.delayMinMax;
        this.lifeTimeMinMax = jsonObject.lifeTimeMinMax;
        this.directionVelocityMix = jsonObject.directionVelocityMix;
        this.alignToDirection = jsonObject.alignToDirection;
        this.directionMinMax = jsonObject.directionMinMax;
        this.startVelocityScale = jsonObject.startVelocityScale;
        this.gravity = jsonObject.gravity;
        this.drag = jsonObject.drag;
        this.speedMinMax = jsonObject.speedMinMax;
        this.animationSpeedMinMax = jsonObject.animationSpeedMinMax;
        this.spinMinMax = jsonObject.spinMinMax;
        this.particleSizeMultiplier = jsonObject.particleSizeMultiplier;
        this.emitPositionMin = jsonObject.emitPositionMin;
        this.emitPositionMax = jsonObject.emitPositionMax;
        this.displaySizeMin = jsonObject.displaySizeMin;
        this.displaySizeMax = jsonObject.displaySizeMax;
        this.alphaMinMax = jsonObject.alphaMinMax;
        this.tintRgbMin = jsonObject.tintRgbMin;
        this.tintRgbMax = jsonObject.tintRgbMax;
    }
}
