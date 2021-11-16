import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import {API_URL} from "../../../../const/const";
import AdminNewsStore from "../../../../bll/admin/admin-news-store";
import {checkFilesOnServer} from "../../../../utils/checkFilesOnServer";

const useStyles = makeStyles((theme) => ({
    imagesItem: {
        position: "relative",
        display: "flex",
        marginBottom: 20,
        '& svg': {
            position: 'absolute',
            top: '-12px',
            right: '-12px',
            backgroundColor: '#fff',
            borderRadius: 16,
            fontSize: '200%'
        },
        '& svg:hover': {
            cursor: 'pointer'
        }
    },
}))

const NewsImagesItem = (props) => {
    const classes = useStyles();

    const imageNews = `${API_URL}/news/${props.newsId}/images/crop_${props.item}`
    const imageTmp = `${API_URL}/tmp/crop_${props.item}`
    const [imageLink,setLink] = useState()

    checkFilesOnServer(imageNews, imageTmp).then(result => setLink(result))

    return (
        <div className={classes.imagesItem}>
            <HighlightOffIcon id={props.index} onClick={()=> {props.DeleteOneImage(props.index)}} color={'error'}/>
            <img src={imageLink} alt=""/>
        </div>
    );
};

export default NewsImagesItem;