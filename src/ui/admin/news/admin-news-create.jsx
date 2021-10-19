import React, {useEffect, useState} from 'react';
import AdminMenu from "../admin-menu";
import {makeStyles} from "@material-ui/core/styles";
import {Button, Divider, TextField, Typography} from "@material-ui/core";
import {dateToString} from "../../../utils/dateToString";
import AdminStore from "../../../bll/admin-store";
import {runInAction} from "mobx";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import AdminHeader from "../header/admin-header";
import {observer} from "mobx-react-lite";
import {AlertDialog} from "./alert";
import { toJS } from 'mobx';
import {useHistory} from "react-router-dom";
import {RM} from "../../../routes/routes";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        minHeight: '100%',
        '@media (max-width: 750px)' : {
            justifyContent: 'center'
        },
        position: "relative"
    },
    content: {
        flexGrow: 1,
        maxWidth: 600,
        width: 600,
        padding: 20,
        '@media (max-width: 750px)' : {
            marginTop: 45
        },
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 15
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
        justifyContent: "space-evenly",
        flexWrap: "wrap",
        margin: '20px 0',
        '@media (max-width: 430px)' : {
            margin: '20px 0 0 0',
        },
    },
    controlButton: {
        width: 190,
        '@media (max-width: 430px)' : {
            marginBottom: 20,
        },
    }
}));


const AdminNewsCreate = () => {

    const matches = useMediaQuery('(min-width:750px)');
    const history = useHistory();

    //очистка ошибки загрузки изображения
    const ClearImageError = () => {
        const avatarImage = document.getElementById('avatarImage')
        const image = document.getElementById('image')
        if(avatarImage){avatarImage.value = ''}
        if(image){image.value = ''}
        runInAction(() => {AdminStore.news_tmp_images_errors = null})
    }
    //очистка input type file
    useEffect(()=>{
        ClearImageError()
    },[])

    const classes = useStyles();

    const [avatar,setAvatar] = useState(null)
    const [dateStart,setDateStart] = useState(dateToString(new Date(Date.parse(Date()))))
    const [dateEnd,setDateEnd] = useState('')
    const [headerFirst,setHeaderFirst] = useState('')
    const [headerSecond,setHeaderSecond] = useState('')
    const [textMain,setTextMain] = useState('')
    const [images,setImages] = useState()

    // загрузка аватар
    const UploadAvatarHeader = (event) => {
        event.preventDefault();
        const data = new FormData()
        data.append('files',event.target.files[0]);
        runInAction(async () => {
            await AdminStore.newsAvatarCreate(data)
            setAvatar(AdminStore.news_tmp_avatar)
        })

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
    }

    //удаление аватара
    const DeleteAvatarHeader = () => {
        runInAction(() => {AdminStore.news_tmp_avatar = null})
        setAvatar(null)
    }

    //зачистка всей формы
    const ClearForm = () => {
        setAvatar('')
        setDateStart(dateToString(new Date(Date.parse(Date()))));
        setDateEnd('');
        setHeaderFirst('');
        setHeaderSecond('');
        setTextMain('');
    }

    //создание массива для для сохранения
    const CreateArr = async () => {
        const Arr = {
            avatar: AdminStore.news_tmp_avatar,
            dateStart,
            dateEnd,
            headerFirst,
            headerSecond,
            textMain,
            images: toJS(AdminStore.news_tmp_images)
        }
        const aaa = await AdminStore.newsCreate(Arr)
        if(aaa === 'ok'){
            history.push(RM.Admin__News.path)
        }else{
            alert(aaa)
        }
    }

    return (
        <div className={classes.root}>
            {matches ? <AdminMenu/> : <AdminHeader header={'Создание новости'}/>}
            <div className={classes.content}>
                {matches && <div className={classes.header}><Typography>Создание новости</Typography></div>}
                <Divider/>
                <div className={classes.avatar} id={'avatar'}>
                    {avatar
                        ?
                        <div className={classes.avatarControl}>
                            <img src={`http://localhost:5000/tmp/${avatar}`} alt=""/>
                            <Button
                                variant={"outlined"}
                                color={"primary"}
                                onClick={()=> {DeleteAvatarHeader()}}
                            >
                                удалить аватар
                            </Button>
                        </div>
                        :
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
                    {AdminStore.news_tmp_images.length > 0 &&
                        <div className={classes.imagesItem}>
                            {
                                AdminStore.news_tmp_images.map((i,index)=>(
                                    <div key={index} onClick={()=> {DeleteOneImage(index)}}>
                                        <img id={index} src={`http://localhost:5000/tmp/crop_${i}`} alt=""/>
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
                    <Button
                        className={classes.controlButton}
                        variant={"outlined"}
                        color={"primary"}
                        onClick={()=>{ClearForm()}}
                    >
                        Очистить форму
                    </Button>
                    <Button
                        className={classes.controlButton}
                        variant="contained"
                        color={"primary"}
                        onClick={()=>{CreateArr()}}
                    >
                        Сохранить новость
                    </Button>
                </div>
            </div>
            {AdminStore.news_tmp_images_errors &&
                <AlertDialog
                    open={true}
                    header={'Ошибка загрузки аватара'}
                    text={AdminStore.news_tmp_images_errors}
                />
            }
        </div>
    );
};

export default observer(AdminNewsCreate);