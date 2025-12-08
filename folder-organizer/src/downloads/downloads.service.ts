import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { DOWNLOADS_PATH } from './constants';
import { getCatg } from './file-utils';

@Injectable()
export class DownloadsService {
    organise(folderPath:string){
        try{
        //now in this function i need to write the logic
        //first i need to read the provided directory
        const files = fs.readdirSync(folderPath);
         const summary : Record<string, number> = {};
          const createdDir = new Set<string>();
        for(const file of files){
            //we need to skip the hidden files
            if(file.startsWith('.')){
                continue;
            }
            const cg = getCatg(file);
            const targetDir = path.join(folderPath,cg);
            if(!createdDir.has(targetDir)){
                if(!fs.existsSync(targetDir)){
                    fs.mkdirSync(targetDir,{recursive:true});
                }
                createdDir.add(targetDir);
            }
            const sourcepath = path.join(folderPath,file);
            const destPath = path.join(targetDir,file);

            fs.renameSync(sourcepath, destPath );

            if(!summary[cg]){
                summary[cg]=0;
            }
            summary[cg]+=1;
        }

        return {
            message: "Organization Completed Successfully",
            directory:folderPath,
            summary,
        };
    }
catch(error){
    console.log("Error organizing the files",error);
    throw error;
}
}
}
