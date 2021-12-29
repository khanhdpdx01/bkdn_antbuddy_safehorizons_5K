import basicInfo from './basicInfo';
import servers from './servers';
import components from './components';
import tags from './tags';
import customers from './customers';

export default {
    ...basicInfo,
    ...servers,
    ...components,
    ...tags,
    ...customers,
};
