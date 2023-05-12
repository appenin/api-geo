import { Flat45Controller } from './flat45.controller';
import { Flat45Service } from './flat45.service';

export const flat45Service = Flat45Service.create();
export const flat45Controller = new Flat45Controller();
