/*  gunakan salah satu untuk latihan, kita buat 3 route : 
    1. region-raw : menggunakan raw query
    2. region-seq : menggunakan method sequelize
    3. region-ctrl : bisnis logic dipisah di folder controller
*/

//import regions from './region-raw.route';
//import regions from './region-seq.route';
import regions from './region-seqctrl.route';


export default {
  regions
};
