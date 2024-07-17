import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    :root{
        /* Event lists' colours */
        --calendar: blanchedalmond;
        --study: rgb(158, 46, 46);

        /* Global colours */
        --mainColour: #89023e;
        --secondaryColour: #cc7178;
        --outlineColour: blanchedalmond;
        --borderColour: black;

        /* Fonts */
        --titleFont: 1.5rem;
        --defaultFont: 1rem;
        --defaultFontWeight: 600;

        /* Border */
        --defaultBorder: 0.5cm solid;
        --menuBorder: 0.1cm solid;
        --buttonBorder: 0.01cm solid;

        /* Box shadow */
        --defaultBoxShadow: 0cm 0.1cm 0.5cm;

        /* z-indexes */
        --globalLevel: 300;
        --midLevel: 200;
        --hiddenLevel: -300;

        /* margins and paddings */
        --defaultMargin: 20px;
        --defaultPadding: 20px;
        --childMargin: 10px;
        --childPadding: 20px;

    }
`