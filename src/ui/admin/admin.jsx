import React from 'react';
/*import AuthStore from "../../bll/auth-store";
import {useHistory} from "react-router-dom";*/
import {observer} from "mobx-react-lite";



const Admin = (props) => {
    /*const history = useHistory();*/

    /*if(AuthStore.isAuth){history.push(MAIN_ROUTE)}*/
    return (
        <div>
            <div>Admin Page</div>
        </div>
    );
};

export default observer(Admin);