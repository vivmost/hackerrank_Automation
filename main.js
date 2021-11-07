const puppeteer = require("puppeteer");
const loginLink = "https://www.hackerrank.com/auth/login";
const codeObj = require("./code")
// Entered email and password are incorrect, try with a valid one!
const email = "cedfff7236@csdfp.com";
const psswd = "1223423";

let browserOpen = puppeteer.launch({
    headless: false,
    args: ['--start-maximized'],
    defaultViewport: null
});

let page;

browserOpen.then(function (browserObj) {
    let browserOpenPromise = browserObj.newPage();
    return browserOpenPromise;
}).then(function (newTab) {
    page = newTab;
    let hackerrankOpenPromise = newTab.goto(loginLink);
    return hackerrankOpenPromise;
}).then(function () {
    let emailIsEntered = page.type("input[id='input-1']", email, { delay: 20 });
    return emailIsEntered;
}).then(function () {
    let psswdIsEntered = page.type("input[id='input-2']", psswd, { delay: 20 });
    return psswdIsEntered;
}).then(function () {
    let loginButtonClick = page.click("button[data-analytics='LoginPassword']", { delay: 20 });
    return loginButtonClick;
}).then(function () {
    let ClickOnAlgoPromise = waitAndClick(".topic-card a[data-attr1='algorithms']", page);
    return ClickOnAlgoPromise;
}).then(function () {
    let getToWarmUp = waitAndClick("input[value='warmup']", page);
    return getToWarmUp;
}).then(function () {
    let waitForSeconds = page.waitFor(1500);
    return waitForSeconds;
}).then(function () {
    let allChallengesPromise = page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled", { delay: 50 });
    return allChallengesPromise;
}).then(function (questionArr) {
    let questionWillBeSolved = questionSolver(page, questionArr[0], codeObj.answers[0]);
    return questionWillBeSolved;
});

function questionSolver(page, question, answer) {
    return new Promise(function (resolve, reject) {
        let questionWillBeSolved = question.click();
        questionWillBeSolved.then(function () {
            let EditorInFocusPromise = waitAndClick(".monaco-editor.no-user-select.vs", page);
            return EditorInFocusPromise;
        }).then(function () {
            return waitAndClick(".checkbox-input", page);
        }).then(function () {
            return page.waitForSelector("textarea.custominput", page);
        }).then(function () {
            return page.type("textarea.custominput", answer, { delay: 10 });
        }).then(function () {
            let ctrlIsPressed = page.keyboard.down("Control");
            return ctrlIsPressed;
        }).then(function () {
            let AisPressed = page.keyboard.press("A", { delay: 100 });
            return AisPressed;
        }).then(function () {
            let XisPressed = page.keyboard.press("X", { delay: 100 });
            return XisPressed;
        }).then(function () {
            let ctrlIsUnpressed = page.keyboard.up("Control");
            return ctrlIsUnpressed;
        }).then(function () {
            let mainEditorInFocus = waitAndClick(".monaco-editor.no-user-select.vs", page);
            return mainEditorInFocus;
        }).then(function () {
            let ctrlIsPressed = page.keyboard.down("Control");
            return ctrlIsPressed;
        }).then(function () {
            let AisPressed = page.keyboard.press("A", { delay: 100 });
            return AisPressed;
        }).then(function () {
            let VisPressed = page.keyboard.press("V", { delay: 100 });
            return VisPressed;
        }).then(function () {
            let ctrlIsUnpressed = page.keyboard.up("Control");
            return ctrlIsUnpressed;
        }).then(function () {
            return page.click(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled", { delay: 50 })
        }).then(function () {
            resolve();
        }).catch(function (err) {
            reject();
        });
    });
}

function waitAndClick(selector, cPage) {
    return new Promise(function (resolve, reject) {
        let waitForModelPromise = cPage.waitForSelector(selector);
        waitForModelPromise.then(function () {
            let clickModal = cPage.click(selector);
            return clickModal;
        }).then(function () {
            resolve();
        }).catch(function (err) {
            reject();
        });
    });
}