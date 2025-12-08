import * as path from 'path';
import {FILE_CATEGORIES} from './file-categories';

export function getCatg(filename:string):string{
    //get the path
    const ext = path.extname(filename).toLowerCase();
    //we check if the file extesnon is present in the defined categories, if yes we return the category type, if no we return 'otehrs' so that they get stored in other di
    for(const categorie of Object.keys(FILE_CATEGORIES)){
        if(FILE_CATEGORIES[categorie].includes(ext)){
            return categorie;
        }
    }
    return 'others';

}
