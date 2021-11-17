import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Divider, TextField} from "@material-ui/core";
import AdminNewsStore from "../../../../bll/admin/admin-news-store";
import {runInAction} from "mobx";
import {API_URL} from "../../../../const/const";
import pdfIcon from "../../../../common/assets/image/icons/pdf.png";
import docIcon from "../../../../common/assets/image/icons/doc.png";
import docxIcon from "../../../../common/assets/image/icons/docx.png";
import xlsIcon from "../../../../common/assets/image/icons/xls.png";
import xlsxIcon from "../../../../common/assets/image/icons/xlsx.png";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import {observer} from "mobx-react-lite";

const useStyles = makeStyles((theme) => ({
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
}))

const NewsDocsItem = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.docsItem}>
            <TextField
                id="headerFirst"
                required={true}
                className={classes.fieldHeader}
                label="название документа"
                value={AdminNewsStore.newsOne.docs[props.index].title}
                onChange={(e)=>{
                    runInAction(() => {AdminNewsStore.newsOne.docs[props.index].title = (e.target.value)})
                }}
                variant="outlined"
                multiline
                rows={1}
                rowsMax={10}
            />
            <a href={`${API_URL}/news/${props.newsId}/docs/${props.item.doc}`} target={'_blank'} rel="noreferrer">
                {AdminNewsStore.newsOne.docs[props.index].doc.slice(AdminNewsStore.newsOne.docs[props.index].doc.lastIndexOf(".")+1) === 'pdf' &&
                <img src={pdfIcon} alt="" width={40}/>
                }
                {AdminNewsStore.newsOne.docs[props.index].doc.slice(AdminNewsStore.newsOne.docs[props.index].doc.lastIndexOf(".")+1) === 'doc' &&
                <img src={docIcon} alt="" width={40}/>
                }
                {AdminNewsStore.newsOne.docs[props.index].doc.slice(AdminNewsStore.newsOne.docs[props.index].doc.lastIndexOf(".")+1) === 'docx' &&
                <img src={docxIcon} alt="" width={40}/>
                }
                {AdminNewsStore.newsOne.docs[props.index].doc.slice(AdminNewsStore.newsOne.docs[props.index].doc.lastIndexOf(".")+1) === 'xls' &&
                <img src={xlsIcon} alt="" width={40}/>
                }
                {AdminNewsStore.newsOne.docs[props.index].doc.slice(AdminNewsStore.newsOne.docs[props.index].doc.lastIndexOf(".")+1) === 'xlsx' &&
                <img src={xlsxIcon} alt="" width={40}/>
                }
            </a>
            <Divider orientation={"vertical"} flexItem={true}/>
            <HighlightOffIcon onClick={()=>{props.DeleteOneDocs(props.index)}} color={'error'}/>
        </div>
    );
};

export default observer(NewsDocsItem);
