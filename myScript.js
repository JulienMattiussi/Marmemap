const version = "0.5.8"

console.log(`MarmeMap version : ${version}}`);
console.log(Object.keys(WA));

const successBoard = {
    wcPicture: {description: "Les photos des anciens dans les WC"},
    superGenial: {description: "La vidéo du film légo dans la salle debian"},
    babyShark: {description: "La vidéo de baby shark dans la salle de bain"},
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

//TOILETS
const toiletsSound = WA.loadSound("assets\/flush.mp3");
const config = {
    volume : 0.1,
    loop : false,
    rate : 1,
    detune : 1,
    delay : 0,
    seek : 0,
    mute : false
}

WA.onLeaveZone('toiletsZone', () => {
    toiletsSound.play(config);
});

//WC PICTURE
WA.onEnterZone('wcPictureZone', () => {
    validateSuccess('wcPicture');
});

//SUCCESS BOARD
WA.onEnterZone('successBoardZone', () => {
    console.log(successBoard);
    const successCount = getSuccessCount();
    const validSuccessCount = getValidSuccessCount(); 
    console.log(validSuccessCount);
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
    console.log(sucessPopup);
    sucessPopup.close();
});