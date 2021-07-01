

let test = 0;

var toiletsSound = WA.loadSound("flush.mp3");
var config = {
    volume : 0.1,
    loop : false,
    rate : 1,
    detune : 1,
    delay : 0,
    seek : 0,
    mute : false
}

WA.onLeaveZone('toilets', () => {
    test++;
    toiletsSound.play(config);
    console.log(Object.keys(WA));
    console.log(test);
});