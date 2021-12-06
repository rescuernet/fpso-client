import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import CompViewResultsDayDocs from "./comp-view-results-day-docs";
import YouTube from "react-youtube";
import Store from "../../../../../bll/store"

const useStyles = makeStyles((theme) => ({
    day: {
        marginBottom: 30
    },
    header: {
        fontSize: '110%',
        fontWeight: 'bold',
        textAlign: "center"
    }
}))

const CompViewResultsDay = ({index,item}) => {
    const classes = useStyles();

    const opts = {
        height: Store.width > 750 ? '406px' : '168px',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    console.log(item)

    return (
        <div className={classes.day}>
            <div className={classes.header}>
                {`Результаты ${index + 1}-го дня соревнований`}
            </div>
            {item.videoTranslation &&
                <YouTube videoId={item.videoTranslation} opts={opts}/>
            }
            <div className={classes.docs}>
                {item.docs.map((itemDoc,indexDoc)=>(
                    <CompViewResultsDayDocs key={indexDoc} index={indexDoc} item={itemDoc}/>
                ))}
            </div>
        </div>
    );
};

export default observer(CompViewResultsDay);