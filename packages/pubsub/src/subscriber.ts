import { createClient } from 'redis';

const subscriber = createClient();
export default subscriber;