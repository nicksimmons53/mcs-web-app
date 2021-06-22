import axios from "axios";
import _ from 'lodash';
import { createFile } from 'pages/Sales/components/Client/helpers/excel';

const sales_app_api_url = process.env.REACT_APP_SALES_APP_API_URL;

const clientAPI = {
    getAll: function ( ) {
        return axios.get(`${sales_app_api_url}/web/clients`)
            .then((res) => res.data);
    },
    exportInfo: function (client, dataRequested) {
        let baseURL = `${sales_app_api_url}/web/clients/${client.id}`;
        let baseURL_files = `${sales_app_api_url}/list-files/${client.name}`;
        let requests = [ ];
        let titles = ["Basic Info", "Advanced Info", "Programs", "Billing Parts", "Files"];

        if (dataRequested.basicInfo === true) {
            requests.push(baseURL);
            requests.push(baseURL + "/contacts")
        }

        if (dataRequested.advInfo === true) {
            requests.push(baseURL + "/advanced-info");
        } else if (dataRequested.advInfo === false) {
            titles.splice(_.indexOf(titles, "Advanced Info"), 1);
        }

        if (dataRequested.programs === true) {
            requests.push(baseURL + "/programs");
        } else if (dataRequested.programs === false) {
            titles.splice(_.indexOf(titles, "Programs"), 1);
        }

        if (dataRequested.billingParts === true) {
            requests.push(baseURL + "/parts");
        } else if (dataRequested.billingParts === false) {
            titles.splice(_.indexOf(titles, "Billing Parts"), 1);
        }

        if (dataRequested.files === true) {
            requests.push(baseURL_files);
        } else if (dataRequested.files === false) {
            titles.splice(_.indexOf(titles, "Files"), 1);
        }

        return axios.all(requests.map((request) => axios.get(request)))
            .then(axios.spread((...res) => {
                console.log(dataRequested,requests)
                let repFirstName = res[0].data[0].fstnme;
                let repLastName = res[0].data[0].lstnme;    
                dataRequested.basicInfo = { 
                    data: _.merge(res[0].data[0], { contacts: res[1].data} ), 
                    title: 'Basic Info'
                };

                _.slice(res, 1).forEach((response, index) => {
                    if (index === 0) 
                        return;        
                    dataRequested[Object.keys(dataRequested)[index]] = { 
                        data: {...response.data, fstnme: repFirstName, lstnme: repLastName}, 
                        title: titles[index]
                    };
                });

                createFile(dataRequested, client.name);
            })
        );
    }
}

export default clientAPI;