import {IResponseDTO} from '../Models/ITableDTO'

export default class AwesomeService {
    private data : IResponseDTO  = [];
    readonly END_POINT  = 'https://5dc0838095f4b90014ddc7c3.mockapi.io/table';
    async read() : Promise<IResponseDTO>{
        if(this.data.length > 0) {
            return this.data;
        }
        try {
            const response = await fetch(this.END_POINT);
            const data : IResponseDTO = await response.json();
            this.data = data;
            return data;
        } catch (e ) {
            return e.message;
        }

    }
}