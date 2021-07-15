import client from './client';
import forums from '../data/Forums';
import { Forum } from '../../@types';

export const getForums = (): Promise<Forum[]> => {
  const data: Forum[] = forums;
  return new Promise((resolve, reject) => {
    resolve(data);
  });
};