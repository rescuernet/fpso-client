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
import {IMG_TMP_URL, NEWS_URL, SRV_URL} from "../../../const/const";


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
        '@media (max-width: 1050px)' : {
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
        '& img': {
            margin: '5px 5px 20px 5px'
        }
    },
    imageAdd: {
        display: "flex",
        justifyContent: "center",
    },
    docs: {
        padding: '20px 0'
    },
    docsItem: {
        display: "flex",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
        '& img': {
            margin: '5px 5px 20px 5px'
        }
    },
    docsAdd: {
        display: "flex",
        justifyContent: "center",
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
        flexDirection: 'column',
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

    //очистка Store перед размонтированием
    useEffect(()=>{
        newsEdit && runInAction(() => {
            AdminStore.news_tmp_avatar_old = newsEdit.avatar
            AdminStore.news_tmp_images_old = newsEdit.images
        })
        return ()=> {
            runInAction(() => {
                AdminStore.news_tmp_avatar_new = null
                AdminStore.news_tmp_avatar_old = null
                AdminStore.news_tmp_images_new = []
                AdminStore.news_tmp_images_old = []
            })
        }
    },[])

    const classes = useStyles();
    const [dateStart,setDateStart] = useState(newsEdit ? dateFns.format(new Date(newsEdit.dateStart), 'yyyy-MM-dd') : dateToString(new Date(Date.parse(Date()))));
    const [dateEnd,setDateEnd] = useState(newsEdit && newsEdit.dateEnd ? dateFns.format(new Date(newsEdit.dateEnd), 'yyyy-MM-dd') : null);
    const [headerFirst,setHeaderFirst] = useState(newsEdit ? newsEdit.headerFirst : '');
    const [headerSecond,setHeaderSecond] = useState(newsEdit ? newsEdit.headerSecond : '');
    const [textMain,setTextMain] = useState(newsEdit ? newsEdit.textMain : '');
    const [fixedNews, setFixedNews] = useState(newsEdit ? newsEdit.fixedNews : false);
    const [importantNews, setImportantNews] = useState(newsEdit ? newsEdit.importantNews : false);
    const [published, setPublishAfterSave] = useState(newsEdit ? newsEdit.published : false);



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
        runInAction(() => {
            AdminStore.news_tmp_avatar_new = null
            AdminStore.news_tmp_avatar_old = null
        })
    };

    //загрузка фотографий
    const UploadImage = (event) => {
        event.preventDefault();
        const data = new FormData()
        data.append('files',event.target.files[0]);
        runInAction( async () => {
            await runInAction(()=>{AdminStore.newsImageCreate(data)})
        })
    };

    //удаление одной фоографии
    const DeleteOneImageNew = (id) => {
        runInAction(() => {AdminStore.news_tmp_images_new.splice(id,1)})
    };
    const DeleteOneImageOld = (id) => {
        runInAction(() => {AdminStore.news_tmp_images_old.splice(id,1)})
    };

    //смена закрепления новости
    const ChangeFixedNews = (event) => {
        setFixedNews(event.target.checked);
    };
    //смена важности новости
    const ChangeImportantNews = (event) => {
        setImportantNews(event.target.checked);
    };
    //опубликовать после сохранения
    const ChangePublishAfterSave = (event) => {
        setPublishAfterSave(event.target.checked);
    };

    //отмена
    const Cancel = () => {
        history.push(RM.Admin__News.path)
    };

    //создание массива для сохранения
    const CreateArr = async () => {
        const Arr = {
            avatar: AdminStore.news_tmp_avatar_new,
            dateStart,
            dateEnd,
            headerFirst,
            headerSecond,
            textMain,
            fixedNews,
            importantNews,
            published,
            images: toJS(AdminStore.news_tmp_images_new),
        }
        const result = await AdminStore.newsCreate(Arr)
        if(result === 200){
            history.push(RM.Admin__News.path)
        }
    };

    //создание массива для обновления
    const UpdateArr = async () => {
        const Arr = {
            id,
            avatarNew: AdminStore.news_tmp_avatar_new,
            avatarOld: newsEdit.avatar,
            imagesNew: toJS(AdminStore.news_tmp_images_new),
            imagesOld: toJS(AdminStore.news_tmp_images_old),
            model: {
                avatar: AdminStore.news_tmp_avatar_new ? AdminStore.news_tmp_avatar_new : AdminStore.news_tmp_avatar_old,
                dateStart,
                dateEnd,
                headerFirst,
                headerSecond,
                textMain,
                fixedNews,
                importantNews,
                published,
                images: toJS(AdminStore.news_tmp_images_new).concat(toJS(AdminStore.news_tmp_images_old))
            }
        }
        const result = await AdminStore.newsUpdate(Arr)
        if(result === 200){
            history.push(RM.Admin__News.path)
        }
    };

    return (
        <div className={classes.root}>
            {Store.width > 1050 ? <AdminMenu open={true} variant={'permanent'} menuIconView={false}/> : <AdminHeader header={'Новости'}/>}
            <div className={classes.wrapper}>
                {Store.width > 1050 && <div className={classes.header}><Typography variant={'h5'}>Новости</Typography></div>}
                <Divider/>
                <div className={classes.content}>
                    <div className={classes.avatar} id={'avatar'}>
                        <div className={classes.avatarControl}>
                            {!AdminStore.news_tmp_avatar_new && AdminStore.news_tmp_avatar_old &&
                                <>
                                    <img src={`${NEWS_URL}/${id}/avatar/${AdminStore.news_tmp_avatar_old}`} alt=""/>
                                    <Button
                                        variant={"outlined"}
                                        color={"primary"}
                                        onClick={()=> {DeleteAvatarHeader()}}
                                    >
                                        удалить аватар
                                    </Button>
                                </>
                            }
                            {AdminStore.news_tmp_avatar_new &&
                                <>
                                    <img src={`${IMG_TMP_URL}/${AdminStore.news_tmp_avatar_new}`} alt=""/>
                                    <Button
                                        variant={"outlined"}
                                        color={"primary"}
                                        onClick={()=> {DeleteAvatarHeader()}}
                                    >
                                        удалить аватар
                                    </Button>
                                </>
                            }
                        </div>
                        {!AdminStore.news_tmp_avatar_new && !AdminStore.news_tmp_avatar_old &&
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
                                    >
                                        выбрать аватар новости
                                    </Button>
                                </label>
                            </div>
                        }
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
                        <div className={classes.imagesItem}>
                            {AdminStore.news_tmp_images_old.length > 0 &&
                                AdminStore.news_tmp_images_old.map((i,index)=>(
                                    <img key={index} src={`${NEWS_URL}/${id}/images/crop_${i}`} onClick={()=> {DeleteOneImageOld(index)}} alt=""/>
                                ))
                            }
                            {AdminStore.news_tmp_images_new.length > 0 &&
                                AdminStore.news_tmp_images_new.map((i,index)=>(
                                    <img id={index} src={`${IMG_TMP_URL}/crop_${i}`} onClick={()=> {DeleteOneImageNew(index)}} alt=""/>
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
                    <Divider/>
                    <div className={classes.docs}>
                        <div className={classes.docsItem}>

                        </div>
                        <div className={classes.docsAdd}>
                            <label htmlFor="docs">
                                <input
                                    style={{ display: 'none' }}
                                    id="docs"
                                    name="docs"
                                    type="file"
                                    /*onChange={UploadDocs}*/
                                />
                                <Button
                                    color="primary"
                                    size="small"
                                    variant={"outlined"}
                                    component={'span'}
                                >
                                    добавить документ
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
                                label="закрепить новость"
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
                                label="важная новость"
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={published}
                                        onChange={ChangePublishAfterSave}
                                        name="publishAfterSave"
                                        color="secondary"
                                    />
                                }
                                label={newsEdit ? 'опубликовать' : 'опубликовать после сохранения'}
                            />
                        </div>
                        <Divider/>
                        <div className={classes.controlButton}>
                            <Button
                                className={classes.Button}
                                variant={"outlined"}
                                color={"primary"}
                                onClick={()=>{Cancel()}}
                            >
                                Отмена
                            </Button>
                            <Button
                                className={classes.Button}
                                variant="contained"
                                color={"primary"}
                                onClick={()=>{newsEdit ? UpdateArr() : CreateArr()}}
                            >
                                {newsEdit ? 'Обновить новость' : 'Сохранить новость'}
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