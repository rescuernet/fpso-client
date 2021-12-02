import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import AdminCompStore from "../../../../bll/admin/admin-competitions-store";
import {runInAction} from "mobx";
import {observer} from "mobx-react-lite";
import CompDocsItem from "./comp-docs-item";

const useStyles = makeStyles((theme) => ({
    docs: {
        padding: '20px 0'
    },
    header: {
        textAlign: "center",
        fontSize: '110%',
        fontWeight: "bold"
    },
    docsDeclarationText: {
        fontSize: '90%',
        color: '#00000085',
        marginBottom: 20,
        textAlign: "center",
    },
    docsAdd: {
        display: "flex",
        justifyContent: "center",
    },
}))

const CompDocs = ({compId}) => {
    const classes = useStyles();

    //загрузка документов
    const UploadDocs = (event) => {
        event.preventDefault();
        const originName = event.target.files[0].name.substr(0,event.target.files[0].name.lastIndexOf("."))
        const data = new FormData()
        data.append('files',event.target.files[0]);
        data.append('compId',compId);
        runInAction( async () => {
            await runInAction(()=>{AdminCompStore.compDocsCreate(data,originName)})
        })
    };
    //удаление одного документа
    const DeleteOneDocs = (docsId) => {
        runInAction(() => {AdminCompStore.compOne.docs.splice(docsId,1)})
    };

    return (
        <div className={classes.docs}>
            <div className={classes.header}>Документы</div>
            <div className={classes.docsDeclarationText}>* Здесь добавляются только общие документы</div>
            {
                AdminCompStore.compOne.docs && AdminCompStore.compOne.docs.map((item,index)=>(
                    <CompDocsItem key={'docs'+index} item={item} index={index} compId={compId} DeleteOneDocs={DeleteOneDocs}/>
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

export default observer(CompDocs);