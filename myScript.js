var toiletsSound = WA.loadSound("flush.mp3");
var config = {
    volume : 0.3,
    loop : false,
    rate : 1,
    detune : 1,
    delay : 0,
    seek : 0,
    mute : false
}

WA.onLeaveZone('toilets', () => {
    toiletsSound.play(config);
});