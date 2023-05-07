import { Component,OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup = new FormGroup({});
  age = 18;
  selectedAddressType: string = 'Home';

  addressTypes = ['Home', 'Company'];


  fileToUpload: File | null = null;
  imageUrl: string = '';
  maxSize: number = 80000;
  dimensions = {
    width: 310,
    height: 325
  };

  constructor() { }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$'), Validators.maxLength(20)]),
      lastName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$'), Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^([0-9]){10}$')]),
      age: new FormControl(this.age, [Validators.required]),
      addressType: new FormControl('Home', [Validators.required]),
      homeAddress1: new FormControl('', [Validators.required]),
      homeAddress2: new FormControl('', [Validators.required]),
      companyAddress1: new FormControl('', [Validators.required]),
      companyAddress2: new FormControl('', [Validators.required])
    });
  }

  handleFileInput(files: FileList): void {
    this.fileToUpload = files.item(0);
    this.validateFile();
  }

  validateFile(): void {
    if (!this.fileToUpload) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.fileToUpload);
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result as string;
      img.onload = () => {
        if (this.fileToUpload && this.fileToUpload.size > this.maxSize) {
          alert(`File size exceeds ${this.maxSize / 1000} KB.`);
          this.clearFileInput();
          return;
        }

        if (img.width !== this.dimensions.width || img.height !== this.dimensions.height) {
          alert(`Image dimensions must be ${this.dimensions.width} x ${this.dimensions.height} pixels.`);
          this.clearFileInput();
          return;
        }
        this.imageUrl = reader.result as string;
      };
    };
  }

  clearFileInput(): void {
    this.fileToUpload = null;
    this.imageUrl = '';
  }

  submitForm(): void {
    console.log(this.registrationForm.value);
  }

}
