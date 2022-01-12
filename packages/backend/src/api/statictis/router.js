import StatictisController from './StatictisController';
import { routerGroup } from '../../common/helpers/routerGroup';

const rolesController = new StatictisController();

export default routerGroup({
        name: 'statictis',
        prefix: '/statictis',
    }, [
    {
        method: 'GET',
        path: '/',
        handlers: [rolesController.callMethod('statictis')],
    }, 
]);
