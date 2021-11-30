import axios from 'axios';

export class Api {
    service = axios;
    headers = {}
    constructor(){
        // service = axios
    }

    setHeaders(headers={}){
        this.headers = headers
        return this;
    }

    async get(endpoint,data)  {
        try {
            const response =  await  this.service.get(endpoint,{
                headers: this.headers,
                data : data
            })
            return response
            
        } catch (error) {
            throw Error("RL Datatable Error: " + error.message);
        }
    }
}


export default  new Api();