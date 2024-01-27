import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MessageService } from 'primeng/api';
import { FileUploadEvent } from 'primeng/fileupload';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css'],
  providers: [MessageService]
})


export class FileuploadComponent {

  uploadedFiles: any[] = [];

    constructor(private messageService: MessageService, private fireStorage : AngularFireStorage) {}

    onUpload($event : FileUploadEvent) {
      const promises : any[] = [];
      $event.files.forEach(file => promises.push(this.fireStorage.upload(`multipleFileUpload/${file.name}`, file)));
      const observable = forkJoin([promises]);
      observable.subscribe({
        next: value => console.log(value)
      })

      this.messageService.add({ key: 'tc', severity: 'success', summary: 'Success', detail: 'File has been Uploaded Successfully' });
    }
}
