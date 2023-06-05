import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-studentform',
  templateUrl: './studentform.component.html',
  styleUrls: ['./studentform.component.scss'],
})
export class StudentformComponent {
  //for save student data
  StudentArray: any[] = [];
  isResultLoaded: boolean = false;
  isUpdateForm: boolean = false;
  showTable: boolean = false;

  stname: string = '';
  birthday: string = '';
  stemail: string = '';
  stphone: string = '';
  staddress: string = '';
  currentId = '';

  constructor(private http: HttpClient) {
    this.getAllStudent();
  }

  ngOnInit(): void {}
  //get all student data from database
  getAllStudent() {
    this.http
      .get('http://localhost:8085/api/student/get')
      .subscribe((res: any) => {
        this.isResultLoaded = true;
        this.StudentArray = res.data.map((student: { birthday: string }) => {
          student.birthday = student.birthday.substring(0, 10);
          return student;
        });
      });
  }
  //save student data in database
  register() {
    let bodyData = {
      stname: this.stname,
      birthday: this.birthday,
      address: this.staddress,
      email: this.stemail,
      phone_no: this.stphone,
    };

    this.http
      .post('http://localhost:8085/api/student/add', bodyData)
      .subscribe((resultData: any) => {
        alert('Employee Registered Successfully');
        this.getAllStudent();
      });
  }

  setUpdate(data: any) {
    this.stname = data.stname;
    this.birthday = data.birthday;
    this.staddress = data.address;
    this.stemail = data.email;
    this.stphone = data.phone_no;
    this.currentId = data.id;
  }
  //update student data in database
  UpdateRecords() {
    let bodyData = {
      stname: this.stname,
      birthday: this.birthday,
      address: this.staddress,
      email: this.stemail,
      phone_no: this.stphone,
    };

    this.http
      .put(
        'http://localhost:8085/api/student/update' + '/' + this.currentId,
        bodyData
      )
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Student Registered Updated Successfully');
        this.getAllStudent();
      });
  }
  //save function for save and update student data
  save() {
    // Check if any required fields are empty
    if (
      this.stname.trim() === '' ||
      this.birthday.trim() === '' ||
      this.stemail.trim() === '' ||
      this.stphone.trim() === '' ||
      this.staddress.trim() === ''
    ) {
      alert('Please fill in all the form fields.');
      return;
    }

    // Validate the date
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(this.birthday)) {
      alert('Please enter a valid date in the format YYYY-MM-DD');
      return;
    }

    // Validate the email
    const regex2 = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!regex2.test(this.stemail)) {
      alert('Please enter a valid email address');
      return;
    }

    if (this.currentId === '') {
      this.register();
    } else {
      this.UpdateRecords();
    }
  }

  //delete student data from database
  setDelete(data: any) {
    this.http
      .delete('http://localhost:8085/api/student/delete' + '/' + data.id)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Student Deleted');
        this.getAllStudent();
      });
  }

  //toggle table for show and hide table
  toggleTable() {
    this.showTable = !this.showTable;
  }
}
