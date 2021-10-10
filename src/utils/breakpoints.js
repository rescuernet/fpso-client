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
    }
});