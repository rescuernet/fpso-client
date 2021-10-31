import React, {useEffect, useState} from 'react';
import AdminMenu from "../admin-menu";
import {makeStyles} from "@material-ui/core/styles";
import {Button, Divider, FormControlLabel, Switch, TextField, Typography} from "@material-ui/core";
import AdminStore from "../../../bll/admin-news-store";
import {runInAction, toJS} from "mobx";
import AdminHeader from "../header/admin-header";
import {observer} from "mobx-react-lite";
import {AlertDialog} from "./alert";
import {useHistory, useParams} from "react-router-dom";
import {RM} from "../../../routes/routes";
import Store from "../../../bll/store";
import * as dateFns from "date-fns";
import {NEWS_URL, TMP_URL} from "../../../const/const";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import docIcon from '../../../common/assets/image/icons/doc.png'
import docxIcon from '../../../common/assets/image/icons/docx.png'
import xlsIcon from '../../../common/assets/image/icons/xls.png'
import xlsxIcon from '../../../common/assets/image/icons/xlsx.png'
import pdfIcon from '../../../common/assets/image/icons/pdf.png'


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        minHeight: '100%',
        position: "relative"
    },
    wrapper: {
        flexGrow: 1,
        [theme.breakpoints.between('sm', 'md')]: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
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
        margin: '20px 40px',
        '@media (max-width: 1050px)' : {
            marginTop: 45,
            margin: '20px 10px',
        },
        [theme.breakpoints.between('sm', 'md')]: {
            width: 600
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
    docs: {
        padding: '20px 0'
    },
    docsItem: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
        '& svg': {
            margin: '0 10px',
            fontSize: '200%'
        },
        '& a': {
            margin: '0 10px'
        },
        '& hr': {
            backgroundColor: '#ccc'
        },
        '& .MuiTextField-root': {
            flexGrow: 1
        },
    },
    docsAdd: {
        display: "flex",
        justifyContent: "center",
    },
    control: {
        display: "flex",
        flexDirection: "column",
        marginBottom: 20,
        '@media (max-width: 430px)' : {
            marginTop: 20,
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
        padding: 20,
        '@media (max-width: 750px)' : {
            flexDirection: 'column',
            alignItems: "center",
        },
    },
    Button: {
        width: 120,
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

    //установка OLD и очистка Store перед размонтированием
    useEffect(()=>{
        if(newsEdit){
            runInAction(() => {
                AdminStore.news_tmp_avatar_old = newsEdit.avatar
                AdminStore.news_tmp_images_old = newsEdit.images
                AdminStore.news_tmp_docs_old = newsEdit.docs
            })
        }
        return ()=> {
            runInAction(() => {
                AdminStore.news_tmp_avatar_new = null
                AdminStore.news_tmp_avatar_old = null
                AdminStore.news_tmp_images_new = []
                AdminStore.news_tmp_images_old = []
                AdminStore.news_tmp_docs_new = []
                AdminStore.news_tmp_docs_old = []
            })
        }
    },[])


    const classes = useStyles();
    const [dateStart,setDateStart] = useState(newsEdit ? dateFns.format(new Date(newsEdit.dateStart), 'yyyy-MM-dd') : dateFns.format(new Date(), 'yyyy-MM-dd'));
    const [dateEnd,setDateEnd] = useState(newsEdit && newsEdit.dateEnd ? dateFns.format(new Date(newsEdit.dateEnd), 'yyyy-MM-dd') : null);
    const [headerFirst,setHeaderFirst] = useState(newsEdit ? newsEdit.headerFirst : '');
    const [headerSecond,setHeaderSecond] = useState(newsEdit ? newsEdit.headerSecond : '');
    const [textMain,setTextMain] = useState(newsEdit ? newsEdit.textMain : '');
    const [fixedNews, setFixedNews] = useState(newsEdit ? newsEdit.fixedNews : false);
    const [importantNews, setImportantNews] = useState(newsEdit ? newsEdit.importantNews : false);
    const [published, setPublishAfterSave] = useState(newsEdit ? newsEdit.published : false);
    const [deleteNews, setDeleteNews] = useState(false);



    // загрузка аватар
    const UploadAvatar = (event) => {
        event.preventDefault();
        const data = new FormData()
        data.append('files',event.target.files[0]);
        runInAction(async () => {
            await AdminStore.newsAvatarCreate(data)
        })
        event.target.value = ''
    };
    //удаление аватара
    const DeleteAvatar = () => {
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
        event.target.value = ''
    };
    //удаление одной фоографии
    const DeleteOneImageNew = (id) => {
        runInAction(() => {AdminStore.news_tmp_images_new.splice(id,1)})
    };
    const DeleteOneImageOld = (id) => {
        runInAction(() => {AdminStore.news_tmp_images_old.splice(id,1)})
    };

    //загрузка документов
    const UploadDocs = (event) => {
        event.preventDefault();
        const originName = event.target.files[0].name.substr(0,event.target.files[0].name.lastIndexOf("."))
        const data = new FormData()
        data.append('files',event.target.files[0]);
        runInAction( async () => {
            await runInAction(()=>{AdminStore.newsDocsCreate(data,originName)})
        })
    };
    //удаление одного документа
    const DeleteOneDocsNew = (id) => {
        runInAction(() => {AdminStore.news_tmp_docs_new.splice(id,1)})
    };
    const DeleteOneDocsOld = (id) => {
        runInAction(() => {AdminStore.news_tmp_docs_old.splice(id,1)})
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
            docs: toJS(AdminStore.news_tmp_docs_new)
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
            docsNew: toJS(AdminStore.news_tmp_docs_new),
            docsOld: toJS(AdminStore.news_tmp_docs_old),
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
                images: toJS(AdminStore.news_tmp_images_new).concat(toJS(AdminStore.news_tmp_images_old)),
                docs: toJS(AdminStore.news_tmp_docs_new).concat(toJS(AdminStore.news_tmp_docs_old))
            }
        }
        const result = await AdminStore.newsUpdate(Arr)
        if(result === 200){
            history.push(RM.Admin__News.path)
        }
    };

    const newsDelete = () => {
        setDeleteNews(true)
    }

    const newsDeleteConfirm = async (id) => {
        setDeleteNews(false)
        const result = await AdminStore.newsDelete(id)
        if(result === 200){
            history.push(RM.Admin__News.path)
        }
    }

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
                                        onClick={()=> {DeleteAvatar()}}
                                    >
                                        удалить аватар
                                    </Button>
                                </>
                            }
                            {AdminStore.news_tmp_avatar_new &&
                                <>
                                    <img src={`${TMP_URL}/${AdminStore.news_tmp_avatar_new}`} alt=""/>
                                    <Button
                                        variant={"outlined"}
                                        color={"primary"}
                                        onClick={()=> {DeleteAvatar()}}
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
                                        onChange={UploadAvatar}
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
                            rowsMax={2}
                            error={headerFirst.length > 100}
                            helperText={headerFirst.length > 100 && 'максимум 100 символов'}
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
                            rowsMax={2}
                            error={headerSecond.length > 100}
                            helperText={headerSecond.length > 100 && 'максимум 100 символов'}
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
                            rows={3}
                            rowsMax={10}
                        />
                    </div>
                    <Divider/>
                    <div className={classes.images}>
                        <div className={classes.imagesItemWrap}>
                            {AdminStore.news_tmp_images_old.length > 0 &&
                                AdminStore.news_tmp_images_old.map((i,index)=>(
                                    <div className={classes.imagesItem}>
                                        <HighlightOffIcon id={index} onClick={()=> {DeleteOneImageOld(index)}} color={'error'}/>
                                        <img key={index} src={`${NEWS_URL}/${id}/images/crop_${i}`} alt=""/>
                                    </div>
                                ))
                            }
                            {AdminStore.news_tmp_images_new.length > 0 &&
                                AdminStore.news_tmp_images_new.map((i,index)=>(
                                    <div className={classes.imagesItem}>
                                        <HighlightOffIcon onClick={()=> {DeleteOneImageNew(index)}} color={'error'}/>
                                        <img id={index} src={`${TMP_URL}/crop_${i}`} alt=""/>
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
                    <Divider/>
                    <div className={classes.docs}>
                        {AdminStore.news_tmp_docs_old.length > 0 &&
                        AdminStore.news_tmp_docs_old.map((i,index)=>(
                            <div className={classes.docsItem}>
                                <TextField
                                    id="headerFirst"
                                    required={true}
                                    className={classes.fieldHeader}
                                    label="название документа"
                                    value={AdminStore.news_tmp_docs_old[index].title}
                                    onChange={(e)=>{
                                        runInAction(() => {AdminStore.news_tmp_docs_old[index].title = (e.target.value)})
                                    }}
                                    variant="outlined"
                                    multiline
                                    rows={1}
                                    rowsMax={10}
                                />
                                <a href={`${NEWS_URL}/${id}/docs/${AdminStore.news_tmp_docs_old[index].doc}`} target={'_blank'} rel="noreferrer">
                                    {AdminStore.news_tmp_docs_old[index].doc.slice(AdminStore.news_tmp_docs_old[index].doc.lastIndexOf(".")+1) === 'pdf' &&
                                    <img src={pdfIcon} alt="" width={40}/>
                                    }
                                    {AdminStore.news_tmp_docs_old[index].doc.slice(AdminStore.news_tmp_docs_old[index].doc.lastIndexOf(".")+1) === 'doc' &&
                                    <img src={docIcon} alt="" width={40}/>
                                    }
                                    {AdminStore.news_tmp_docs_old[index].doc.slice(AdminStore.news_tmp_docs_old[index].doc.lastIndexOf(".")+1) === 'docx' &&
                                    <img src={docxIcon} alt="" width={40}/>
                                    }
                                    {AdminStore.news_tmp_docs_old[index].doc.slice(AdminStore.news_tmp_docs_old[index].doc.lastIndexOf(".")+1) === 'xls' &&
                                    <img src={xlsIcon} alt="" width={40}/>
                                    }
                                    {AdminStore.news_tmp_docs_old[index].doc.slice(AdminStore.news_tmp_docs_old[index].doc.lastIndexOf(".")+1) === 'xlsx' &&
                                    <img src={xlsxIcon} alt="" width={40}/>
                                    }
                                </a>
                                <Divider orientation={"vertical"} flexItem={true}/>
                                <HighlightOffIcon onClick={()=>{DeleteOneDocsOld(index)}} color={'error'}/>
                            </div>
                        ))
                        }

                        {AdminStore.news_tmp_docs_new.length > 0 &&
                        AdminStore.news_tmp_docs_new.map((i,index)=>(
                            <div className={classes.docsItem}>
                                <TextField
                                    id="headerFirst"
                                    required={true}
                                    className={classes.fieldHeader}
                                    label="название документа"
                                    value={AdminStore.news_tmp_docs_new[index].title}
                                    onChange={(e)=>{
                                        runInAction(() => {AdminStore.news_tmp_docs_new[index].title = (e.target.value)})
                                    }}
                                    variant="outlined"
                                    multiline
                                    rows={1}
                                    rowsMax={10}
                                />
                                <a href={TMP_URL + '/' + AdminStore.news_tmp_docs_new[index].doc} target={'_blank'} rel="noreferrer">
                                    {AdminStore.news_tmp_docs_new[index].doc.slice(AdminStore.news_tmp_docs_new[index].doc.lastIndexOf(".")+1) === 'pdf' &&
                                        <img src={pdfIcon} alt="" width={40}/>
                                    }
                                    {AdminStore.news_tmp_docs_new[index].doc.slice(AdminStore.news_tmp_docs_new[index].doc.lastIndexOf(".")+1) === 'doc' &&
                                    <img src={docIcon} alt="" width={40}/>
                                    }
                                    {AdminStore.news_tmp_docs_new[index].doc.slice(AdminStore.news_tmp_docs_new[index].doc.lastIndexOf(".")+1) === 'docx' &&
                                    <img src={docxIcon} alt="" width={40}/>
                                    }
                                    {AdminStore.news_tmp_docs_new[index].doc.slice(AdminStore.news_tmp_docs_new[index].doc.lastIndexOf(".")+1) === 'xls' &&
                                    <img src={xlsIcon} alt="" width={40}/>
                                    }
                                    {AdminStore.news_tmp_docs_new[index].doc.slice(AdminStore.news_tmp_docs_new[index].doc.lastIndexOf(".")+1) === 'xlsx' &&
                                    <img src={xlsxIcon} alt="" width={40}/>
                                    }
                                </a>

                                <Divider orientation={"vertical"} flexItem={true}/>
                                <HighlightOffIcon onClick={()=>{DeleteOneDocsNew(index)}} color={'error'}/>
                            </div>
                        ))
                        }

                        <div className={classes.docsAdd}>
                            <label htmlFor="docs">
                                <input
                                    style={{ display: 'none' }}
                                    id="docs"
                                    name="docs"
                                    type="file"
                                    onChange={UploadDocs}
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
                                {newsEdit ? 'Обновить' : 'Сохранить'}
                            </Button>
                            {newsEdit &&
                                <Button
                                    className={classes.Button}
                                    variant="contained"
                                        color={"secondary"}
                                    onClick={()=>{newsDelete()}}
                                >
                                    удалить
                                </Button>
                            }
                            {deleteNews &&
                                <AlertDialog
                                    alertType={'confirm'}
                                    open={true}
                                    header={'Внимание!'}
                                    text={'Подтвердите удаление новости'}
                                    delete={()=>{newsDeleteConfirm(id)}}
                                    close={()=>{setDeleteNews(false)}}
                                />
                            }

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