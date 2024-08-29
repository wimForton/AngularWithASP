import {particleCustomProperties} from "./particleCustomProperties";
import { particleSystemData } from "./particleSystemData";
import { flyAround, reset, parkOutsideWindow, updatePosition } from "./particleDefaultBehavior";
import { CreateParticles } from "./particleCreateFunctions";
import { particlePointLoader } from "./particlePointLoader";
import { particlePixiData } from "./particlePixiData";
//import { yellowButton } from "../tools/button";
import { emitFromBox } from "./emitters/emitFromBox";
import { randomizeDirection } from "./forces/randomizeDirection";
import { velocityToRotation } from "./forces/velocityToRotation";
import { directionToForce } from "./forces/directionToForce";
import { bounceBoxForce } from "./forces/bounceBoxForce";

export interface force {
    (pSysData: particleSystemData, particleIndex: number, delta: number): void;
}

export interface forceClass {
    calculate(pSysData: particleSystemData, particleIndex: number, delta: number): void;
}

export interface emitClass {
    emit(pSysData: particleSystemData, particleIndex: number): void;
}

export class particleSystem{
    //PIXI specific data
    private parent: PIXI.Container;

    //private activeGameData: CommonData;
    //private particleContainer: PIXI.particles.ParticleContainer;
    private stopped: boolean = false;

    public pSysData: particleSystemData;
    private useDefaultForce: boolean = true;
    private useDefaultEmitter: boolean = true;
    private particlePixiData: particlePixiData;
    private forceFunctions: Array<force> = new Array<force>();//forceClasses
    private forceClasses: Array<forceClass> = new Array<forceClass>();
    private emitClasses: Array<emitClass> = new Array<emitClass>();
    //private yellowbutton: yellowButton;
    //private app: PIXI.Application;
    private windowSize: Array<number>;
    private ticker: PIXI.ticker.Ticker;
    private gameFPS: number;
    
    constructor(
        parent: PIXI.Container,
        ticker: PIXI.ticker.Ticker,
        windowSize: Array<number>,
        gameFPS: number,
        jsonObject: any,
        parentParticleSystem?: particleSystem | particlePointLoader | PIXI.extras.AnimatedSprite | PIXI.Sprite | PIXI.Container,
        useDefaultTicker: boolean = true
        )
    {
        this.parent = new PIXI.Container();
        if (typeof jsonObject == typeof this.pSysData && jsonObject != null) {
            this.pSysData = jsonObject;
        }
        this.ticker = ticker;
        this.ticker;
        this.windowSize = windowSize;
        this.gameFPS = gameFPS;
        //this.activeGameData = activeGameData;
        //this.activeGameData;
        parent.addChild(this.parent);
        this.pSysData = new particleSystemData(parent, this.ticker, jsonObject);
        if (typeof parentParticleSystem !== 'undefined' && parentParticleSystem != null) {
            if (parentParticleSystem instanceof particleSystem || particlePointLoader)this.pSysData.hasParentParticleSystem = true;
            if (parentParticleSystem instanceof PIXI.extras.AnimatedSprite || 
                parentParticleSystem instanceof PIXI.Sprite  || 
                parentParticleSystem instanceof PIXI.Container ){
                    //console.log(parentParticleSystem);
                    //this.pSysData.followSprite = true;
                }
        }


        this.pSysData.parentParticleSystem = parentParticleSystem;
        this.pSysData.parentParticleSystem;


        this.pSysData.displaySizeMin[0] *= this.windowSize[0];
        this.pSysData.displaySizeMin[1] *= this.windowSize[1];
        this.pSysData.displaySizeMax[0] *= this.windowSize[0];
        this.pSysData.displaySizeMax[1] *= this.windowSize[1];
        
        //scale the emit box to screenresolution
        this.pSysData.emitPositionMin[0] *= this.windowSize[0];
        this.pSysData.emitPositionMin[1] *= this.windowSize[1];
        this.pSysData.emitPositionMax[0] *= this.windowSize[0];
        this.pSysData.emitPositionMax[1] *= this.windowSize[1];

        this.pSysData.pSystemTime = 0;
        this.pSysData.particleCustomProperties = new Array<particleCustomProperties>();

        CreateParticles(this.pSysData);
        this.particlePixiData = new particlePixiData(this.pSysData, this.parent);
        if(useDefaultTicker){
            this.addTicker();
        }
        //this.createControls();
        //this.yellowbutton
        //this.yellowbutton = new yellowButton(this.parent, [30, 150], this.resetData.bind(this));
        //this.buttonVisible(false);
    }

    public sliderBoxVisible(bool: boolean){
        this.pSysData.sliderBoxVisible(bool);
    }

    public buttonPosition(pos: number[]){
        pos
        //this.yellowbutton.setPos(pos);
    }

    public buttonVisible(bool: boolean){
        bool
        //this.yellowbutton.setVisible(bool)
    }

    public resetData(){
        //console.log("resetData");
        CreateParticles(this.pSysData);
        this.particlePixiData.removePixiparticles();
        this.particlePixiData.createPixiparticles(this.pSysData);
    }

    public UseDefaultForce(bool: boolean){
        if(bool){
            let RandomizeDirection = new randomizeDirection();
            let AlignToVelocity = new velocityToRotation();
            let DirectionToForce = new directionToForce(0.02);
            let BounceForce = new bounceBoxForce();
            this.forceClasses.push(RandomizeDirection);
            this.forceClasses.push(AlignToVelocity);
            this.forceClasses.push(DirectionToForce);
            this.forceClasses.push(BounceForce);
        }
        this.useDefaultForce = bool;
    }
    
    public UseDefaultEmitter(bool: boolean){
        if(bool){
            let boxEmitter = new emitFromBox();
            this.emitClasses.push(boxEmitter);
        }
        this.useDefaultEmitter = bool;
    }
    public addForce(force: force){
        this.forceFunctions.push(force);
    }

    public addForceClass(forceclass: forceClass){
        this.forceClasses.push(forceclass);
    }

    public addEmitClass(emitClass: emitClass){
        this.emitClasses.push(emitClass);
    }

    public addCustomTicker(ticker: PIXI.ticker.Ticker){
        ticker
        //this.ticker.add
    }

    public SetStartVelocityScale(startVelocityScale: number): void{
        this.pSysData.startVelocityScale = startVelocityScale;
    }
    public GetParticleArray() : Array<PIXI.extras.AnimatedSprite | PIXI.Sprite>{
        return this.particlePixiData.particleArray;//        this.particlePixiData = new particlePixiData(this.pSysData, parent);
    }
    public GetParentParticleSystem() : particleSystem | particlePointLoader | PIXI.extras.AnimatedSprite | PIXI.Sprite | PIXI.Container{
        return this.pSysData.parentParticleSystem;
    }
    public Start(){
        this.stopped = false;
        this.pSysData.pSystemTime = 0;
        for (var i = 0; i < this.pSysData.particleCustomProperties.length; i++) {
            reset(this.pSysData, i);
        }
    }
    public Stop(){
        this.stopped = true;
    }

    public defaultUpdateFrameFunction(delta: number){
        this.pSysData.pSystemTime += 1 / this.gameFPS;
        this.pSysData.pSystemFrame += 1;
        if(true){
                //console.log("X: ", this.pSysData.parentParticleSystem.x);
                this.pSysData.emitPositionMin[0] = this.pSysData.parentParticleSystem.x;
                this.pSysData.emitPositionMin[1] = this.pSysData.parentParticleSystem.y;
                this.pSysData.emitPositionMax[0] = this.pSysData.parentParticleSystem.x;
                this.pSysData.emitPositionMax[1] = this.pSysData.parentParticleSystem.y;
            }

        for (var i = 0; i < this.pSysData.particleCustomProperties.length; i++) {
            let doNotRecycle: boolean;
            if(this.stopped){
                doNotRecycle = true;//this.pSysData.particleCustomProperties[i].age > this.pSysData.particleCustomProperties[i].lifeTime;
            }else{
                doNotRecycle = this.pSysData.particleCustomProperties[i].age > this.pSysData.particleCustomProperties[i].lifeTime && this.pSysData.recycleParticles == false;
            }
            if(this.pSysData.pSystemTime > this.pSysData.particleCustomProperties[i].delay && !doNotRecycle){
                if(!this.pSysData.particleCustomProperties[i].alive){
                    if(this.useDefaultEmitter){
                    reset(this.pSysData, i);
                    }
                    for (let index = 0; index < this.emitClasses.length; index++) {
                        this.emitClasses[index].emit(this.pSysData, i);
                    }
                }else{
                    if(this.useDefaultForce){
                        flyAround(this.pSysData, i, delta);
                    }
                        
                    for (let index = 0; index < this.forceFunctions.length; index++) {
                        this.forceFunctions[index](this.pSysData, i, delta);
                    }
                    for (let index = 0; index < this.forceClasses.length; index++) {
                        this.forceClasses[index].calculate(this.pSysData, i, delta);
                    }
                    updatePosition(this.pSysData, i);
                }

                if(this.pSysData.particleCustomProperties[i].age > this.pSysData.particleCustomProperties[i].lifeTime){
                    if(this.pSysData.recycleParticles)reset(this.pSysData, i);
                    else parkOutsideWindow(this.pSysData, i);
                }
            }else parkOutsideWindow(this.pSysData, i);
            if(this.stopped && !this.pSysData.recycleParticles){
                parkOutsideWindow(this.pSysData, i);
            }
            
            this.particlePixiData.particleUpdatePixiData(i);

        }
    }


    private addTicker = (): void => {
        this.ticker.add((delta) => {
            this.defaultUpdateFrameFunction(delta);
        });
    }

}
