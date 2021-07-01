

const getValue = () => localStorage.getItem('monChat');

const incrementValue = () => {
    const value = parseInt(getValue()) || 0;
    localStorage.setItem('monChat', value + 1);
}

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
    incrementValue();
    toiletsSound.play(config);
    WA.sendChatMessage(getValue(), 'Mr Robot');
});