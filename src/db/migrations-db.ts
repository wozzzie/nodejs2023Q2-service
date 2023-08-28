import { DataSource } from 'typeorm';
import { dataSourceOptions } from './data-source';

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
