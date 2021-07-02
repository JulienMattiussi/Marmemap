console.log(Object.keys(WA));
let test = 0;
let sucessPopup;

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

if (window.fetch) {
    console.log("fetch a tester");
} else {
    console.log("oublie fetch");
}



WA.onEnterZone('toilets', () => {
    test++;
    WA.displayBubble();
    console.log(test);
    sucessPopup = WA.openPopup(
        "successPopup", 
        `SUCCESS BOARD
        to be completed
        `, 
        [{
            label: "Close",
            className: "primary",
            callback: (popup) => {
                // Close the popup when the "Close" button is pressed.
                popup.close();
            }
        }]
    );
});

WA.onLeaveZone('toilets', () => {
    test++;
    toiletsSound.play(config);
    WA.removeBubble();
    console.log(test);
    sucessPopup.close();
});