import { database } from '../../../config/database';
import { Flat45Controller } from './flat45.controller';
import { Flat45Service } from './flat45.service';

export const flat45Service = new Flat45Service(database);
export const flat45Controller = new Flat45Controller(flat45Service);
