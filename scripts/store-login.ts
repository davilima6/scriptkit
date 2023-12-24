// Name: Store - Login
// Description: Selects one product and logs in
// @see https://github.com/johnlindquist/kit/blob/main/API.md
// @see https://www.scriptkit.com/docs/run-shell-commands

import '@johnlindquist/kit';

const LOCALE = 'de-DE';
const URL = `http://localhost:3000/${LOCALE}`;
const USER = 'davi.medeiros+de@sumup.com';

const BTN = {
  GO_TO_CHECKOUT: '=go-to-checkout-btn',
  GO_TO_CART: '=go-to-cart-btn',
  LOGIN: 'a[href^=login]',
  SELECT_PRODUCT: '^=product_card',
  SUBMIT: 'button[type=submit]',
};

function getByTestId(idMatcher: string): string {
  return `document.querySelector('[data-testid${idMatcher}]')`;
}

function submitForm(): string {
  const submitBtn = `document.querySelector('${BTN.SUBMIT}')`;
  return `
    ${waitToEnabled(submitBtn)}
    execute javascript "${submitBtn}.click()"
`;
}

function typeInField(kind: 'email' | 'password', value: string): string {
  return `
    execute javascript "document.querySelector('input[type=${kind}]').focus()"
    execute javascript "document.querySelector('input[type=${kind}]').value='${value}'"
    execute javascript "document.querySelector('input[type=${kind}]').blur()"
`;
}

function waitToEnabled(element: string): string {
  return `
    repeat until (execute javascript "${element}?.hasAttribute('disabled')") is false
        delay 0.5
    end repeat
`;
}

function waitToInteractive(): string {
  return `
    repeat until (execute javascript "document.readyState") is "interactive"
        delay 0.5
    end repeat
`;
}

// function debug(debugText = 'Hello, World!'): string {
//   return `execute javascript "alert('${debugText}')"`;
// }

applescript(`
tell application "Google Chrome"
    if not (exists window 1) then
        make new window
    end if
    tell window 1 to make new tab with properties {URL:"${URL}"}
    activate
    tell active tab of window 1
        ${waitToInteractive()}

        ${waitToEnabled(getByTestId(BTN.SELECT_PRODUCT))}
        execute javascript "${getByTestId(BTN.SELECT_PRODUCT)}.click()"

        ${waitToEnabled(getByTestId(BTN.GO_TO_CART))}
        execute javascript "${getByTestId(BTN.GO_TO_CART)}.click()"

        ${waitToEnabled(getByTestId(BTN.GO_TO_CHECKOUT))}
        execute javascript "${getByTestId(BTN.GO_TO_CHECKOUT)}.click()"

        ${waitToInteractive()}
        execute javascript "document.querySelector('${BTN.LOGIN}').click()"

        ${waitToInteractive()}
        ${typeInField('email', USER)}
        ${typeInField('password', USER)}

        ${submitForm()}
        end tell
end tell
`);
