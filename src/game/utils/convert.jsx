



export class Utils {
    static convertIndexToPosition = (index) => {
        return [+index % 8, +Math.floor( index / 8) ];
}
    static convertPosToIndex = (pos) => {
        const [x, y] = [...pos];
        const isSpillover = (n) => {
            const possible = [0,1,2,3,4,5,6,7];
            return (!possible.indexOf(n) == -1)
        }
        if (isSpillover(x) || isSpillover(y)) {
            return -1
        }

        return (y * 8 + x);
}


}