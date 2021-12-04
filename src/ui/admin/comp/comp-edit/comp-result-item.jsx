import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import {Button} from "@material-ui/core";
import {runInAction} from "mobx";
import AdminCompStore from "../../../../bll/admin/admin-competitions-store";

const useStyles = makeStyles((theme) => ({
    header: {
        fontFamily: "Roboto",
        fontSize: '100%',
        fontWeight: 'bold',
        textAlign: "center",
        marginBottom: 20
    },
    docsAdd: {
        display: "flex",
        justifyContent: "center",
    },
}))

const CompResultItem = ({index,compId}) => {
    const classes = useStyles();

    //загрузка документов
    const UploadDocs = (event) => {
        event.preventDefault();
        const component = 'results'
        const originName = event.target.files[0].name.substr(0,event.target.files[0].name.lastIndexOf("."))
        const data = new FormData()
        data.append('files',event.target.files[0]);
        data.append('compId',compId);
        runInAction( async () => {
            await runInAction(()=>{AdminCompStore.compDocsCreate(data,originName,component)})
        })
    };
    //удаление одного документа
    const DeleteOneDocs = (docsId) => {
        runInAction(() => {AdminCompStore.compOne.docs.splice(docsId,1)})
    };

    return (
        <>
            <div className={classes.header}>
                {`Результаты ${index +1}-го дня соревнований`}
            </div>
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
        </>
    );
};

export default observer(CompResultItem);