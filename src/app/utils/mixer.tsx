export default function Mixer(mixer: number) {

    let volumeA, volumeB;

    if (mixer === -50) {
        volumeA = 100;
        volumeB = 0;
    } else if (mixer === 50) {
        volumeA = 0;
        volumeB = 100;
    } else if (mixer === 0) {
        volumeA = 100;
        volumeB = 100;
    } else if (mixer < 0) {

        const normalizedValue = (mixer + 50) / 50;
        volumeA = 100;
        volumeB = 100 * normalizedValue;
    } else {

        const normalizedValue = (50 - mixer) / 50;
        volumeA = 100 * normalizedValue;
        volumeB = 100;
    }

    return { volumeA, volumeB };

}