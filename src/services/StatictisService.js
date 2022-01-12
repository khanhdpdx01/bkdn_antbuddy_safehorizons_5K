import Service from './Services';

class StatictisService {
    constructor(callback) {
        this.callback = callback;
    }

    async statictis() {
        try {
            const statictis = await Service.get('/statictis');
            return statictis.data;
        } catch (err) {
            console.log(err);
            return ({ error: JSON.stringify(err) });
        }
    }
}
export default new StatictisService();