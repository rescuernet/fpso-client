import {createTheme} from "@material-ui/core/styles"


export const useGridPoint = createTheme({
    breakpoints: {
        values: {
            xs: 576,
            sm: 750,
            md: 992,
            lg: 1280,
            xl: 1920
        }
    },
    palette: {
        primary: {
            /*main: '#365587'*/
            /*main: '#013d66'*/
            main: '#005580'
        },
        secondary: {
            main: '#d60000'
        }
    },
});


