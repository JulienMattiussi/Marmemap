const version = "0.5.10"

console.log(`MarmeMap version : ${version}}`);
console.log(Object.keys(WA));

const successBoard = {
    wcPicture: {description: "Les photos des anciens dans les WC"},
    superGenial: {description: "La vidéo du film légo dans la salle debian"},
    babyShark: {description: "La vidéo de baby shark dans la douche"},
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
            return `${list}
            ${desc}`;
        }, '');
    return okList;
}

const getToDoList = () => {
    const todoList = Object
        .keys(successBoard)
        .filter(key => !successBoard[key].valid)
        .reduce((list, name) => {
            return `${list}
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

//WC PHILLIPE ZONE
const phillipeSound = WA.loadSound("assets\/phillipe.mp3");
const phillipeSoundConfig = {
    volume : 0.3,
    loop : false,
    rate : 1,
    detune : 1,
    delay : 5,
    seek : 0,
    mute : false
}

WA.onEnterZone('phillipeZone', () => {
    phillipeSound.play(phillipeSoundConfig);
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
});

WA.onLeaveZone('successBoardZone', () => {
    //WA.removeBubble();
    sucessPopup.close();
});