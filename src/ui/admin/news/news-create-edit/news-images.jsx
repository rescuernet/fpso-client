import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import AdminNewsStore from "../../../../bll/admin/admin-news-store";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import {API_URL} from "../../../../const/const";
import {runInAction} from "mobx";
import {observer} from "mobx-react-lite";

const useStyles = makeStyles((theme) => ({
    images: {
        padding: '20px 0'
    },
    imagesItemWrap: {
        display: "flex",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
    },
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
    imageAdd: {
        display: "flex",
        justifyContent: "center",
    },
}))

const NewsImages = ({id}) => {
    const classes = useStyles();
    //загрузка фотографий
    const UploadImage = (event) => {
        event.preventDefault();
        const data = new FormData()
        data.append('files',event.target.files[0]);
        runInAction( async () => {
            await runInAction(()=>{AdminNewsStore.newsImageCreate(data)})
        })
        event.target.value = ''
    };
    //удаление одной фоографии
    const DeleteOneImageNew = (id) => {
        runInAction(() => {AdminNewsStore.news_tmp_images_new.splice(id,1)})
    };
    const DeleteOneImageOld = (id) => {
        runInAction(() => {AdminNewsStore.news_tmp_images_old.splice(id,1)})
    };

    return (
        <div className={classes.images}>
            <div className={classes.imagesItemWrap}>
                {AdminNewsStore.news_tmp_images_old.length > 0 &&
                AdminNewsStore.news_tmp_images_old.map((i,index)=>(
                    <div className={classes.imagesItem}>
                        <HighlightOffIcon id={index} onClick={()=> {DeleteOneImageOld(index)}} color={'error'}/>
                        <img key={index} src={`${API_URL}/news/${id}/images/crop_${i}`} alt=""/>
                    </div>
                ))
                }
                {AdminNewsStore.news_tmp_images_new.length > 0 &&
                AdminNewsStore.news_tmp_images_new.map((i,index)=>(
                    <div className={classes.imagesItem}>
                        <HighlightOffIcon onClick={()=> {DeleteOneImageNew(index)}} color={'error'}/>
                        <img id={index} src={`${API_URL}/tmp/crop_${i}`} alt=""/>
                    </div>
                ))
                }
            </div>
            <div className={classes.imageAdd}>
                <label htmlFor="image">
                    <input
                        style={{ display: 'none' }}
                        id="image"
                        name="image"
                        type="file"
                        onChange={UploadImage}
                    />
                    <Button
                        color="primary"
                        size="small"
                        variant={"outlined"}
                        component={'span'}
                    >
                        добавить фотографию
                    </Button>
                </label>
            </div>
        </div>
    );
};

export default observer(NewsImages);