import React from 'react';
import _ from 'lodash';

function RBAC({ user, roles, children }) {
    let permissionCheck = user.Permissions.Admin;

    // Return No Access Allowed Alert
    if (roles === null) {
        return <></>;
    }

    roles.forEach((role) => {
        permissionCheck = _.get(user.Permissions, role);

        if (permissionCheck === true) 
            return;
    });

    // Return No Access Allowed Alert
    if (permissionCheck === false) {
        return <></>;
    }

    return permissionCheck && children;
}

export default RBAC;