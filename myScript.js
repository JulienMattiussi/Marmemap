const version = "0.7.21";

console.log(`MarmeMap version : ${version}`);
console.log(`WA API: ${Object.keys(WA)}`);

const successBoard = {
  wcPicture: { description: "Les photos des anciens dans les WC" },
  superGenial: { description: "La vidéo du film légo dans la salle debian" },
  babyShark: { description: "La vidéo de baby shark dans la douche" },
  axe: { description: "La hache dans le coin du dressing" },
  philippe: { description: "Philiiiipe après 5s d'attente au baby" },
  intolerable: { description: "Parler 3 fois au voisin" },
};
let sucessPopup;
let neighbourPopup;
let catPopup;
let catText = "Nothing to tell you today";
let philippeTimer;
const philippeDelay = 5; //in seconds
let intolerableCount = 0;

const validateSuccess = (name) => {
  let success = successBoard[name];
  if (!success.valid) {
    success.valid = true;
  }
};

const getSuccessCount = () => Object.keys(successBoard).length;

const getValidSuccessCount = () =>
  Object.values(successBoard).filter((value) => value.valid).length;

const getSuccessList = () => {
  const okList = Object.values(successBoard)
    .filter((value) => value.valid)
    .map((sucess) => sucess.description)
    .reduce((list, desc) => {
      return `${list} /
            ${desc}`;
    }, "");
  return okList;
};

const getToDoList = () => {
  const todoList = Object.keys(successBoard)
    .filter((key) => !successBoard[key].valid)
    .reduce((list, name) => {
      return `${list} /
            ${name} ???`;
    }, "");
  return todoList;
};

//TOILETS ZONE
const toiletsSound = WA.loadSound("assets/flush.mp3");
const toiletsSoundConfig = {
  volume: 0.1,
  loop: false,
  rate: 1,
  detune: 1,
  delay: 0,
  seek: 0,
  mute: false,
};

WA.onLeaveZone("toiletsZone", () => {
  toiletsSound.play(toiletsSoundConfig);
});

//WC PICTURE ZONE
WA.onEnterZone("wcPictureZone", () => {
  validateSuccess("wcPicture");
});

//WC BABYSHARK ZONE
WA.onEnterZone("babySharkZone", () => {
  validateSuccess("babyShark");
});

//WC SUPERGENIAL ZONE
WA.onEnterZone("superGenialZone", () => {
  validateSuccess("superGenial");
});

//WC AXE ZONE
WA.onEnterZone("axeZone", () => {
  validateSuccess("axe");
});

//WC PHILIPPE ZONE
const philippeSound = WA.loadSound("assets/philippe.mp3");
const philippeSoundConfig = {
  volume: 0.3,
  loop: false,
  rate: 1,
  detune: 1,
  delay: philippeDelay,
  seek: 0,
  mute: false,
};

WA.onEnterZone("philippeZone", () => {
  philippeTimer = Date.now();
  philippeSound.play(philippeSoundConfig);
});

WA.onLeaveZone("philippeZone", () => {
  philippeSound.stop();
  if (Date.now() > philippeTimer + philippeDelay * 1000) {
    validateSuccess("philippe");
  }
});

//NEIGHBOUR ZONE
WA.onEnterZone("intolerableZone", () => {
  let intolerableText;
  switch (intolerableCount) {
    case 0:
      intolerableText = "Vous pouriez dire bonjour !";
      break;
    case 1:
      intolerableText = "Faites moins de bruit, merci !";
      break;
    default:
      intolerableText = "Ca devient intolérable !!";
      validateSuccess("intolerable");
  }
  neighbourPopup = WA.openPopup("intolerablePopup", intolerableText, []);
});

WA.onLeaveZone("intolerableZone", () => {
  neighbourPopup.close();
  intolerableCount++;
});

//SUCCESS BOARD
WA.onEnterZone("successBoardZone", () => {
  const successCount = getSuccessCount();
  const validSuccessCount = getValidSuccessCount();
  //WA.displayBubble();
  sucessPopup = WA.openPopup(
    "successBoardPopup",
    `SUCCESS BOARD

        Tu a découvert
        ${validSuccessCount} succes
        sur ${successCount}`,
    [
      {
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
            [
              {
                label: "Close",
                className: "primary",
                callback: (popup) => {
                  popup.close();
                },
              },
            ]
          );
        },
      },
    ]
  );

  setTimeout(() => {
    const style = document.createAttribute("style");
    style.value = "white-space:pre-line;";
    let popupDiv = document.getElementsByClassName(
      "nes-container with-title is-centered"
    );
    popupDiv[0] ? popupDiv[0].setAttributeNode(style) : null;
  }, 5000);
});

WA.onLeaveZone("successBoardZone", () => {
  //WA.removeBubble();
  sucessPopup.close();
});

//CAT ZONE
let myHeaders = new Headers();
//myHeaders.append("Content-Type", "application/json");

let myInit = {
  method: "GET",
  headers: myHeaders,
  mode: "cors",
  cache: "default",
};

let myRequest = new Request(
  "https://cat-fact.herokuapp.com/facts/random?animal_type=cat",
  myInit
);

fetch(myRequest, myInit)
  .then((response) => response.json())
  .then((response) => {
    catText = response && response[0] && response[0].text;
    console.log(response);
  })
  .catch((error) => {
    catText = "Oups, I bugged, maybe"
    console.log(
      "Il y a eu un problème avec l'opération fetch: " + error.message
    );
  });

WA.onEnterZone("catZone", () => {
  catPopup = WA.openPopup("catPopup", catText, []);

});

WA.onLeaveZone("catZone", () => {
  catPopup.close();
    console.log("window.top");
    console.log(window.top);
    console.log("window.top.localStorage");
    console.log(window.top.localStorage);
    if (window.top && window.top.localStorage) {
      console.log("u2");
      user = window.top.localStorage.getItem('User');
      console.log("u2 user");
      console.log(user);
    }
});


