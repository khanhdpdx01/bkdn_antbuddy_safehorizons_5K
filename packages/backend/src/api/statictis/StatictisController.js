import BaseController from '../../infrastructure/Controllers/BaseController';
import Service from './StatictisService';


class StatictisController extends BaseController {
    constructor() {
        super();
        this.statictisService = Service.getStatictisService();
    }

    static getShippersController() {
        if (!StatictisController.instance) {
            StatictisController.instance = new StatictisController();
        }
        return StatictisController.instance;
    }

    
    async statictis(req, res) {
        console.log('api')
        const result = await this.statictisService.statictis();
        return res.status(200).json(result);
    }
}
export default StatictisController;
