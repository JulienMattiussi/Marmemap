var toiletsSound = WA.loadSound("flush.mp3");
var config = {
    volume : 0.5,
    loop : false,
    rate : 1,
    detune : 1,
    delay : 0,
    seek : 0,
    mute : false
}
// ...
toiletsSound.stop();

WA.onEnterZone('toilets', () => {
    WA.sendChatMessage("Hello!", 'Mr Robot');
});

WA.onLeaveZone('toilets', () => {
    toiletsSound.play(config);
    WA.sendChatMessage("Hello!", 'Mr Robot');
});