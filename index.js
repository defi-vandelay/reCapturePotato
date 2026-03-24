// Get all DOM elements
var qImg = document.querySelectorAll(".q-img");
var identifier = document.querySelector("#q-identifier");
var qType1 = document.querySelector("#q-type1");
var qType2 = document.querySelector("#q-type2");
var initBtn = document.querySelector("#b-col1-item");
var spinnerEl = document.querySelector("#b-spinner");
var quizFrame = document.querySelector("#q-grid-container");
var qTri = document.querySelectorAll(".q-triangle");
var refBtn = document.querySelector("#refresh");
var feedbackMsg = document.querySelector("#feedback-msg");
var gridContainer = document.querySelector("#q-grid-container");
var verBtn = document.querySelector("#verify-button");
var isLoading = false;
var loadingTimer = null;

// populate the squares with potato images
function populateSquares() {
  if (!qImg || !identifier || !qType1 || !qType2 || !feedbackMsg || !gridContainer) {
    console.error('Required elements not found');
    return;
  }

  qImg.forEach((el) => {
    // set background to potato image from root folder
    el.style.backgroundImage = "url(potatoes.png)";
    el.style.backgroundSize = "126px";
    //reset refresh button settings
    el.style.webkitTransform = "rotate(0deg)";
    el.style.mozTransform = "rotate(0deg)";
  });
  
  feedbackMsg.style.display = "none";
  gridContainer.style.height = "580px";
  
  // set textContent
  identifier.textContent = "potatoes";
  qType1.style.display = "inline";
  qType2.style.display = "none";
}

// Hide quiz by default
populateSquares();
if (quizFrame) quizFrame.style.display = "none";
if (qTri) {
  qTri.forEach((el) => {
    el.style.display = "none";
  });
}
if (initBtn) initBtn.style.borderColor = "#c1c1c1";

// Add click handler for the checkbox
if (initBtn) {
  initBtn.addEventListener("click", function() {
    if (isLoading) return;

    if (quizFrame.style.display === "none") {
      // Show spinner in place of checkbox while "loading"
      isLoading = true;
      initBtn.style.display = "none";
      spinnerEl.style.display = "block";

      loadingTimer = setTimeout(function() {
        // Loading complete — hide spinner, restore checkbox, open quiz
        spinnerEl.style.display = "none";
        initBtn.style.display = "";
        initBtn.style.borderColor = "#4d90fe";
        quizFrame.style.display = "grid";
        qTri.forEach((el) => {
          el.style.display = "block";
        });
        isLoading = false;
      }, 1500);
    } else {
      quizFrame.style.display = "none";
      qTri.forEach((el) => {
        el.style.display = "none";
      });
      initBtn.style.borderColor = "#c1c1c1";
    }
  });
}

//event listener for closing quiz window
document.addEventListener("click", function(event) {
  if (isLoading) return;
  var el = event.target;
  if (el.classList.contains("q") === false && el !== initBtn && !initBtn.contains(el)) {
    if (quizFrame && quizFrame.style.display === "grid") {
      quizFrame.style.display = "none";
      qTri.forEach((el) => {
        el.style.display = "none";
      });
      initBtn.style.borderColor = "#c1c1c1";
    }
  }
});

// Inject blue tick icon into each quiz square if not present
qImg.forEach((el) => {
  if (!el.querySelector('.blue-tick')) {
    var tick = document.createElement('div');
    tick.className = 'blue-tick';
    el.appendChild(tick);
  }
});

// add event listeners to quiz squares
if (qImg) {
  qImg.forEach((el) => {
    el.addEventListener("click", function() {
      if (el.classList.contains('selected')) {
        el.classList.remove('selected');
        el.style.margin = "0px";
        el.style.backgroundSize = "126px";
      } else {
        el.classList.add('selected');
        el.style.margin = "12px";
        el.style.backgroundSize = "106px";
      }
    });
  });
}

// refresh button
if (refBtn) {
  refBtn.addEventListener("click", function() {
    qImg.forEach((el) => {
      if (el.style.webkitTransform === "rotate(0deg)") {
        el.style.webkitTransform = "rotate(90deg)";
        el.style.mozTransform = "rotate(90deg)";
      } else if (el.style.webkitTransform = "rotate(90deg)") {
        el.style.webkitTransform = "rotate(180deg)";
        el.style.mozTransform = "rotate(180deg)";
        feedbackMsg.style.display = "inline";
        feedbackMsg.textContent = "Does this help?";
        gridContainer.style.height = "610px";
      }
    });
  });
}

// verify button
if (verBtn) {
  verBtn.addEventListener("click", function() {
    // Reset all selections
    qImg.forEach((el) => {
      el.classList.remove('selected');
      if (el.style.margin === "12px") {
        el.style.margin = "0px";
        el.style.backgroundSize = "126px";
      }
    });
    // Show results page
    console.log("welcome to the results page");
    results();
  });
}

function results() {
  var resultsBlock = document.querySelector("#results-block");
  if (quizFrame) quizFrame.style.display = "none";
  if (resultsBlock) resultsBlock.style.display = "block";
}

// DANGER ZONE! RESET ALL SCORES TO ZERO //
// function resetScores() {
//   var updates = {};
//   for(y=1; y<=8; y++){
//     for(x=1; x<=9; x++){
//       updates["lvl1/scores/q"+y.toString()+"/img0"+x.toString()] = 0;
//     }
//   }
//   for(y=1; y<=4; y++){
//     for(x=1; x<=9; x++){
//       updates["lvl2/scores/q"+y.toString()+"/img0"+x.toString()] = 0;
//     }
//   }
//   return firebase.database().ref().update(updates);
// };
