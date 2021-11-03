import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Button, Divider, TextField} from "@material-ui/core";
import AdminNewsStore from "../../../../bll/admin-news-store";
import {runInAction} from "mobx";
import {NEWS_URL, TMP_URL} from "../../../../const/const";
import pdfIcon from "../../../../common/assets/image/icons/pdf.png";
import docIcon from "../../../../common/assets/image/icons/doc.png";
import docxIcon from "../../../../common/assets/image/icons/docx.png";
import xlsIcon from "../../../../common/assets/image/icons/xls.png";
import xlsxIcon from "../../../../common/assets/image/icons/xlsx.png";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const useStyles = makeStyles((theme) => ({
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
}))

const Docs = ({id}) => {
    const classes = useStyles();

    //загрузка документов
    const UploadDocs = (event) => {
        event.preventDefault();
        const originName = event.target.files[0].name.substr(0,event.target.files[0].name.lastIndexOf("."))
        const data = new FormData()
        data.append('files',event.target.files[0]);
        runInAction( async () => {
            await runInAction(()=>{AdminNewsStore.newsDocsCreate(data,originName)})
        })
    };
    //удаление одного документа
    const DeleteOneDocsNew = (id) => {
        runInAction(() => {AdminNewsStore.news_tmp_docs_new.splice(id,1)})
    };
    const DeleteOneDocsOld = (id) => {
        runInAction(() => {AdminNewsStore.news_tmp_docs_old.splice(id,1)})
    };

    return (
        <div className={classes.docs}>
            {AdminNewsStore.news_tmp_docs_old.length > 0 &&
            AdminNewsStore.news_tmp_docs_old.map((i,index)=>(
                <div className={classes.docsItem}>
                    <TextField
                        id="headerFirst"
                        required={true}
                        className={classes.fieldHeader}
                        label="название документа"
                        value={AdminNewsStore.news_tmp_docs_old[index].title}
                        onChange={(e)=>{
                            runInAction(() => {AdminNewsStore.news_tmp_docs_old[index].title = (e.target.value)})
                        }}
                        variant="outlined"
                        multiline
                        rows={1}
                        rowsMax={10}
                    />
                    <a href={`${NEWS_URL}/${id}/docs/${AdminNewsStore.news_tmp_docs_old[index].doc}`} target={'_blank'} rel="noreferrer">
                        {AdminNewsStore.news_tmp_docs_old[index].doc.slice(AdminNewsStore.news_tmp_docs_old[index].doc.lastIndexOf(".")+1) === 'pdf' &&
                        <img src={pdfIcon} alt="" width={40}/>
                        }
                        {AdminNewsStore.news_tmp_docs_old[index].doc.slice(AdminNewsStore.news_tmp_docs_old[index].doc.lastIndexOf(".")+1) === 'doc' &&
                        <img src={docIcon} alt="" width={40}/>
                        }
                        {AdminNewsStore.news_tmp_docs_old[index].doc.slice(AdminNewsStore.news_tmp_docs_old[index].doc.lastIndexOf(".")+1) === 'docx' &&
                        <img src={docxIcon} alt="" width={40}/>
                        }
                        {AdminNewsStore.news_tmp_docs_old[index].doc.slice(AdminNewsStore.news_tmp_docs_old[index].doc.lastIndexOf(".")+1) === 'xls' &&
                        <img src={xlsIcon} alt="" width={40}/>
                        }
                        {AdminNewsStore.news_tmp_docs_old[index].doc.slice(AdminNewsStore.news_tmp_docs_old[index].doc.lastIndexOf(".")+1) === 'xlsx' &&
                        <img src={xlsxIcon} alt="" width={40}/>
                        }
                    </a>
                    <Divider orientation={"vertical"} flexItem={true}/>
                    <HighlightOffIcon onClick={()=>{DeleteOneDocsOld(index)}} color={'error'}/>
                </div>
            ))
            }

            {AdminNewsStore.news_tmp_docs_new.length > 0 &&
            AdminNewsStore.news_tmp_docs_new.map((i,index)=>(
                <div className={classes.docsItem}>
                    <TextField
                        id="headerFirst"
                        required={true}
                        className={classes.fieldHeader}
                        label="название документа"
                        value={AdminNewsStore.news_tmp_docs_new[index].title}
                        onChange={(e)=>{
                            runInAction(() => {AdminNewsStore.news_tmp_docs_new[index].title = (e.target.value)})
                        }}
                        variant="outlined"
                        multiline
                        rows={1}
                        rowsMax={10}
                    />
                    <a href={TMP_URL + '/' + AdminNewsStore.news_tmp_docs_new[index].doc} target={'_blank'} rel="noreferrer">
                        {AdminNewsStore.news_tmp_docs_new[index].doc.slice(AdminNewsStore.news_tmp_docs_new[index].doc.lastIndexOf(".")+1) === 'pdf' &&
                        <img src={pdfIcon} alt="" width={40}/>
                        }
                        {AdminNewsStore.news_tmp_docs_new[index].doc.slice(AdminNewsStore.news_tmp_docs_new[index].doc.lastIndexOf(".")+1) === 'doc' &&
                        <img src={docIcon} alt="" width={40}/>
                        }
                        {AdminNewsStore.news_tmp_docs_new[index].doc.slice(AdminNewsStore.news_tmp_docs_new[index].doc.lastIndexOf(".")+1) === 'docx' &&
                        <img src={docxIcon} alt="" width={40}/>
                        }
                        {AdminNewsStore.news_tmp_docs_new[index].doc.slice(AdminNewsStore.news_tmp_docs_new[index].doc.lastIndexOf(".")+1) === 'xls' &&
                        <img src={xlsIcon} alt="" width={40}/>
                        }
                        {AdminNewsStore.news_tmp_docs_new[index].doc.slice(AdminNewsStore.news_tmp_docs_new[index].doc.lastIndexOf(".")+1) === 'xlsx' &&
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
    );
};

export default Docs;