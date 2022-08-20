import {css} from 'styled-components';

export const small = (props) => {
    return css`
    @media only screen and (max-width: 950px) {
        ${props}
    }
    `
}

export const tablet = (props) => {
    return css`
    @media only screen and (max-width: 630px) {
        ${props}
    }
    `
}

export const mobile = (props) => {
    return css`
        @media only screen and (max-width: 445px) {
            ${props}
        }
    `
}

