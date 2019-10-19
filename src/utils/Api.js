import axios from 'axios';

export class Api {
    service = axios;
    constructor(){
        // service = axios
    }

    async get(endpoint,data)  {
        const response =  await  this.service.get(endpoint,{
            data : data
        })
        return response
    }
}


export default  new Api();