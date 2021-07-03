const version = "0.5.25"

console.log(`MarmeMap version : ${version}}`);
console.log(Object.keys(WA));

const successBoard = {
    wcPicture: {description: "Les photos des anciens dans les WC"},
    superGenial: {description: "La vidéo du film légo dans la salle debian"},
    babyShark: {description: "La vidéo de baby shark dans la douche"},
    axe: {description: "La hache dans le coin du dressing"},
};
let sucessPopup;


const validateSuccess = (name) => {
    successBoard[name].valid = true;
}

const getSuccessCount = () => Object.keys(successBoard).length;

const getValidSuccessCount = () => 
    Object.values(successBoard).filter(value => value.valid).length;

const getSuccessList = () => {
    const okList = Object
        .values(successBoard)
        .filter(value => value.valid)
        .map(sucess => sucess.description)
        .reduce((list, desc) => {
            return `${list} / 
            ${desc}`;
        }, '');
    return okList;
}

const getToDoList = () => {
    const todoList = Object
        .keys(successBoard)
        .filter(key => !successBoard[key].valid)
        .reduce((list, name) => {
            return `${list} / 
            ${name} ???`;
        }, '');
    return todoList;
}

//TOILETS ZONE
const toiletsSound = WA.loadSound("assets\/flush.mp3");
const toiletsSoundConfig = {
    volume : 0.1,
    loop : false,
    rate : 1,
    detune : 1,
    delay : 0,
    seek : 0,
    mute : false
}

WA.onLeaveZone('toiletsZone', () => {
    toiletsSound.play(toiletsSoundConfig);
});

//WC PICTURE ZONE
WA.onEnterZone('wcPictureZone', () => {
    validateSuccess('wcPicture');
});

//WC BABYSHARK ZONE
WA.onEnterZone('babySharkZone', () => {
    validateSuccess('babyShark');
});

//WC SUPERGENIAL ZONE
WA.onEnterZone('superGenialZone', () => {
    validateSuccess('superGenial');
});

//WC AXE ZONE
WA.onEnterZone('axeZone', () => {
    validateSuccess('axe');
});

//WC PHILIPPE ZONE
const philippeSound = WA.loadSound("assets\/philippe.mp3");
const philippeSoundConfig = {
    volume : 0.3,
    loop : false,
    rate : 1,
    detune : 1,
    delay : 5,
    seek : 0,
    mute : false
}

WA.onEnterZone('philippeZone', () => {
    philippeSound.play(philippeSoundConfig);
});

//SUCCESS BOARD
WA.onEnterZone('successBoardZone', () => {
    const successCount = getSuccessCount();
    const validSuccessCount = getValidSuccessCount(); 
    //WA.displayBubble();
    sucessPopup = WA.openPopup(
        "successBoardPopup", 
        `SUCCESS BOARD

        Tu a découvert 
        ${validSuccessCount} succes
        sur ${successCount}`, 
        [{
            label: "Next",
            className: "primary",
            callback: (popup) => {
                popup.close(); 
                sucessPopup = WA.openPopup(
                    "successBoardPopup", 
                    `SUCCESS BOARD

                    ${getSuccessList()}
                    ${getToDoList()}
                    `, 
                    [{
                        label: "Close",
                        className: "primary",
                        callback: (popup) => {
                            popup.close();
                        }
                    }]
                );
            }
        }]
    );

    
    const style = document.createAttribute("style"); 
    style.value = "white-space:pre-line;";
    let popupDiv = document.getElementsByClassName("nes-container with-title is-centered");
    console.log(popupDiv);
    popupDiv[0] ? popupDiv[0].setAttributeNode(style) : null;     
    
});

WA.onLeaveZone('successBoardZone', () => {
    //WA.removeBubble();
    sucessPopup.close();
});