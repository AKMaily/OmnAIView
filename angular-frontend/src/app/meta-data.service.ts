import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MetaDataService {
    private filePath;
    private fileName;
    private duration;

    constructor() {
        this.filePath = 'this/is/a/path';
        this.fileName = 'testfile';
        this.duration = 1;
    }

    updateFilePath(newPath: string) { this.filePath = newPath; }
    getFilePath(): string { return this.filePath; }

    updateFileName(newName: string) { this.fileName = newName; }
    getFileName(): string { return this.fileName; }

    updateDuration(newDuration: number) { this.duration = newDuration; }
    getDuration(): number { return this.duration; }
    
}
