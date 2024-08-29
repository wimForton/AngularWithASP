export class particleCustomProperties{
    public turningSpeed = 0;
    public direction = 0;
    public delay: number = 0;
    public age: number = 0.0;
    public lifeTime: number = 1;
    public alive: boolean = false;
    public startAlpha: number = 1;
    public drag: number = 1;
    public scale: number[] = [1,1]
    public position: number[] = [0,0];
    public velocity: number[] = [0,0,0];
    public gravity: number[] = [0,0];
    public speed: number = 1.5;
    public startsize: number = 1;
    public rgbColor: number[] = [1,1,1];
    public tint: number[] = [1,1,1];//PIXI.utils.rgb2hex([1,1,1]);
    public alpha: number = 1;
    public rotation: number = 0;
    public spin: number = 0;
    public addDirection: number = 0;
    public animationSpeed = 1;
    public clipStartFrame = 0;
    public bounce = 1;
}