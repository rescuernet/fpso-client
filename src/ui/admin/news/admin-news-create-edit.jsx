import React, {useEffect, useState} from 'react';
import AdminMenu from "../admin-menu";
import {makeStyles} from "@material-ui/core/styles";
import {Button, Divider, FormControlLabel, Switch, TextField, Typography} from "@material-ui/core";
import {dateToString} from "../../../utils/dateToString";
import AdminStore from "../../../bll/admin-store";
import {runInAction, toJS} from "mobx";
import AdminHeader from "../header/admin-header";
import {observer} from "mobx-react-lite";
import {AlertDialog} from "./alert";
import {useHistory, useParams} from "react-router-dom";
import {RM} from "../../../routes/routes";
import Store from "../../../bll/store";
import * as dateFns from "date-fns";
import {SRV_URL} from "../../../const/const";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        minHeight: '100%',
        '@media (max-width: 750px)' : {
            justifyContent: 'center'
        },
        position: "relative"
    },
    wrapper: {
        flexGrow: 1,
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        padding: 20
    },
    content: {
        display: "flex",
        flexDirection: "column",
        maxWidth: 600,
        padding: 20,
        '@media (max-width: 750px)' : {
            marginTop: 45,
        },
    },
    avatar: {
        padding: '20px 0'
    },
    avatarAdd: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        '& > div': {
            marginTop: 15,
            color: '#ff0000',
            fontSize: 13,
            fontWeight: 'bold'
        },
        '& > label > span': {
            padding: '5px 15px',
            fontSize: '0.875rem'
        }
    },
    avatarControl: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        '& img': {
            display: 'block',
            marginBottom: 20
        }
    },
    avatarError: {
        color: '#ff0000',
    },
    fieldsDates: {
        display: "flex",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
        padding: '20px 0',
        '@media (max-width: 430px)' : {
            padding: "20px 0 0 0",
        },
    },
    fieldDate: {
        '@media (max-width: 430px)' : {
            marginBottom: 20,
        },
    },
    fieldsText: {
        display: "flex",
        flexDirection: "column",
        '& > div': {
            marginBottom: 20
        }
    },
    images: {
        padding: '20px 0'
    },
    imagesItem: {
        display: "flex",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
        marginBottom: 20,
        '& img': {
            margin: 5
        }
    },
    imageAdd: {
        display: "flex",
        justifyContent: "center"
    },
    control: {
        display: "flex",
        flexDirection: "column",
        '@media (max-width: 430px)' : {
            margin: '20px 0 0 0',
        },
    },
    controlCheckBox: {
        display: "flex",
        flexWrap: "wrap",
        padding: 10
    },
    controlButton: {
        display: "flex",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
        padding: 20
    },
    Button: {
        width: 190,
        '@media (max-width: 430px)' : {
            marginBottom: 20,
        },
    }
}));


const AdminNewsCreateEdit = () => {
    const history = useHistory();
    const { id } = useParams();
    const newsEdit = id && toJS(AdminStore.news).find(item => item._id === id)
    id && !newsEdit && history.push(RM.Admin__News.path)



    //очистка ошибки загрузки изображения
    const ClearImageError = () => {
        const avatarImage = document.getElementById('avatarImage')
        const image = document.getElementById('image')
        if(avatarImage){avatarImage.value = ''}
        if(image){image.value = ''}
        AdminStore.news_tmp_avatar = null;
        AdminStore.news_tmp_images = [];
    }
    //очистка input type file
    useEffect(()=>{
        ClearImageError()
    },[])

    const classes = useStyles();
    const [dateStart,setDateStart] = useState(newsEdit ? dateFns.format(new Date(newsEdit.dateStart), 'yyyy-MM-dd') : dateToString(new Date(Date.parse(Date()))));
    const [dateEnd,setDateEnd] = useState(newsEdit && newsEdit.dateEnd ? dateFns.format(new Date(newsEdit.dateEnd), 'yyyy-MM-dd') : null);
    const [headerFirst,setHeaderFirst] = useState(newsEdit ? newsEdit.headerFirst : '');
    const [headerSecond,setHeaderSecond] = useState(newsEdit ? newsEdit.headerSecond : '');
    const [textMain,setTextMain] = useState(newsEdit ? newsEdit.textMain : '');
    const [images,setImages] = useState();
    const [fixedNews, setFixedNews] = useState(newsEdit ? newsEdit.fixedNews : false);
    const [importantNews, setImportantNews] = useState(newsEdit ? newsEdit.importantNews : false);
    newsEdit && runInAction(() => {AdminStore.news_tmp_avatar = newsEdit.avatar})


    // загрузка аватар
    const UploadAvatarHeader = (event) => {
        event.preventDefault();
        const data = new FormData()
        data.append('files',event.target.files[0]);
        runInAction(async () => {
            await AdminStore.newsAvatarCreate(data)
        })

    };
    //удаление аватара
    const DeleteAvatarHeader = () => {
        runInAction(() => {AdminStore.news_tmp_avatar = null})
    };

    //загрузка фотографий
    const UploadImage = (event) => {
        event.preventDefault();
        const data = new FormData()
        data.append('files',event.target.files[0]);
        runInAction( async () => {
            await runInAction(()=>{AdminStore.newsImageCreate(data)})
            setImages(toJS(AdminStore.news_tmp_images))
        })
    };

    //удаление одной фоографии
    const DeleteOneImage = (id) => {
        runInAction(() => {AdminStore.news_tmp_images.splice(id,1)})
    };

    //смена закрепления новости
    const ChangeFixedNews = (event) => {
        setFixedNews(event.target.checked);
    };
    //смена важности новости
    const ChangeImportantNews = (event) => {
        setImportantNews(event.target.checked);
    };

    //зачистка всей формы
    const ClearForm = () => {
        AdminStore.news_tmp_avatar = null;
        setDateStart(dateToString(new Date(Date.parse(Date()))));
        setDateEnd('');
        setHeaderFirst('');
        setHeaderSecond('');
        setTextMain('');
        setFixedNews(false);
        setImportantNews(false);
        AdminStore.news_tmp_images = [];
    };

    //создание массива для для сохранения
    const CreateArr = async () => {
        const Arr = {
            avatar: AdminStore.news_tmp_avatar,
            dateStart,
            dateEnd,
            headerFirst,
            headerSecond,
            textMain,
            fixedNews,
            importantNews,
            images: toJS(AdminStore.news_tmp_images)
        }
        const result = await AdminStore.newsCreate(Arr)
        if(result === 200){
            history.push(RM.Admin__News.path)
        }
    };

    return (
        <div className={classes.root}>
            {Store.width > 750 ? <AdminMenu open={true} variant={'permanent'} menuIconView={false}/> : <AdminHeader header={'Новости'}/>}
            <div className={classes.wrapper}>
                {Store.width > 750 && <div className={classes.header}><Typography variant={'h5'}>Новости</Typography></div>}
                <Divider/>
                <div className={classes.content}>
                    <div className={classes.avatar} id={'avatar'}>
                        {/*{AdminStore.news_tmp_avatar
                            ?

                        }*/}
                        <div className={classes.avatarControl}>
                            <img src={`${SRV_URL}/tmp/${AdminStore.news_tmp_avatar}`} alt=""/>
                            <Button
                                variant={"outlined"}
                                color={"primary"}
                                onClick={()=> {DeleteAvatarHeader()}}
                            >
                                удалить аватар
                            </Button>
                        </div>
                        <div className={classes.avatarAdd}>
                            <label htmlFor="avatarImage">
                                <input
                                    style={{ display: 'none' }}
                                    id="avatarImage"
                                    name="avatarImage"
                                    type="file"
                                    onChange={UploadAvatarHeader}
                                />
                                <Button
                                    color="primary"
                                    size="small"
                                    variant={"outlined"}
                                    component={'span'}
                                    onClick={()=>{ClearImageError()}}
                                >
                                    выбрать аватар новости
                                </Button>
                            </label>
                        </div>
                    </div>
                    <Divider/>
                    <div className={classes.fieldsDates}>
                        <TextField
                            id="dateStart"
                            required={true}
                            label="Опубликовать с даты"
                            type="date"
                            value={dateStart}
                            onChange={(e)=>{setDateStart(e.target.value)}}
                            className={classes.fieldDate}
                            variant={"outlined"}
                            InputLabelProps={{shrink: true,}}
                        />
                        <TextField
                            id="dateEnd"
                            label="Окончить публикацию"
                            type="date"
                            value={dateEnd}
                            onChange={(e)=>{setDateEnd(e.target.value)}}
                            className={classes.fieldDate}
                            variant={"outlined"}
                            InputLabelProps={{shrink: true,}}
                        />
                    </div>
                    <div className={classes.fieldsText} >
                        <TextField
                            id="headerFirst"
                            required={true}
                            className={classes.fieldHeader}
                            label="Заголовок"
                            value={headerFirst}
                            onChange={(e)=>{setHeaderFirst(e.target.value)}}
                            variant="outlined"
                            multiline
                            rows={1}
                            rowsMax={4}
                        />
                        <TextField
                            id="headerSecond"
                            className={classes.fieldHeader}
                            label="Дополнительный заголовок"
                            value={headerSecond}
                            onChange={(e)=>{setHeaderSecond(e.target.value)}}
                            variant="outlined"
                            multiline
                            rows={1}
                            rowsMax={4}
                        />
                        <TextField
                            id="textMain"
                            required={true}
                            className={classes.fieldText}
                            label="Текст новости"
                            value={textMain}
                            onChange={(e)=>{setTextMain(e.target.value)}}
                            variant="outlined"
                            multiline
                            rows={10}
                            rowsMax={10}
                        />
                    </div>
                    <Divider/>
                    <div className={classes.images}>
                        {AdminStore.news_tmp_images.length > 0 &&
                        <div className={classes.imagesItem}>
                            {
                                AdminStore.news_tmp_images.map((i,index)=>(
                                    <div key={index} onClick={()=> {DeleteOneImage(index)}}>
                                        <img id={index} src={`${SRV_URL}/tmp/crop_${i}`} alt=""/>
                                    </div>
                                ))
                            }
                        </div>
                        }
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
                                    onClick={()=>{ClearImageError()}}
                                >
                                    добавить фотографию
                                </Button>
                            </label>
                        </div>
                    </div>
                    <Divider/>
                    <div className={classes.control}>
                        <div className={classes.controlCheckBox}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={fixedNews}
                                        onChange={ChangeFixedNews}
                                        name="fixedNews"
                                        color="secondary"
                                    />
                                }
                                label="Закрепить новость"
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={importantNews}
                                        onChange={ChangeImportantNews}
                                        name="importantNews"
                                        color="secondary"
                                    />
                                }
                                label="Важная новость"
                            />
                        </div>
                        <Divider/>
                        <div className={classes.controlButton}>
                            <Button
                                className={classes.Button}
                                variant={"outlined"}
                                color={"primary"}
                                onClick={()=>{ClearForm()}}
                            >
                                Очистить форму
                            </Button>
                            <Button
                                className={classes.Button}
                                variant="contained"
                                color={"primary"}
                                onClick={()=>{CreateArr()}}
                            >
                                Сохранить новость
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            {AdminStore.news_tmp_errors &&
                <AlertDialog
                    open={true}
                    header={'Ошибка!'}
                    text={AdminStore.news_tmp_errors}
                />
            }
        </div>
    );
};

export default observer(AdminNewsCreateEdit);