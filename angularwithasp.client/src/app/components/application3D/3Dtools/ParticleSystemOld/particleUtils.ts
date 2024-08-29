export function MinMaxRandomize(min: any, max: any){
    return min + Math.random() * (max - min);
}
export function MinMaxRandomizeArray(min: number[], max: number[]){
    let result: number[] = [0,0,0];
    for(var i = 0; i < min.length; i++){
        result[i] = min[i] + Math.random() * (max[i] - min[i]);
    }
    return result;
}

export function lerp (start: number, end: number, weight: number){
    return (1-weight)*start+weight*end;
  }