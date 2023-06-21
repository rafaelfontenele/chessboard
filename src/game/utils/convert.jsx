



export class Utils {
    static convertIndexToPosition = (index) => {
        return [+index % 8, +Math.floor( index / 8) ];
}
    static convertPosToIndex = (pos) => {
        const [x, y] = [...pos];
        return (y * 8 + x);
}


}