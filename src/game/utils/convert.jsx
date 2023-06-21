


export const utils = () => {
    const convertIndexToPosition = (index) => {
        return [index % 8, Math.floor( index / 8) ];
    }
    const convertPosToIndex = (pos) => {
      const [x, y] = [...pos];
      return (y * 8 + x);
    }

    return { convertIndexToPosition, convertPosToIndex }
}