import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { ProductModel } from '../model/product.model';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  form: FormGroup;
  constructor(private fb: FormBuilder,private httpClient:HttpClient,@Inject(MAT_DIALOG_DATA) public data:ProductModel,private dialogRef:MatDialog) {
    this.form = this.fb.group({
      id:[this.data.id],
      name: [this.data.name],
      price: [this.data.price],
      description: [this.data.description],
    });
   }
   
  onSubmit() {
    this.httpClient.put('http://localhost:8082/product/update/'+this.data.id,this.form.value).subscribe((data)=>{
      if(data){
        Swal.fire({
          title: 'Success!',
          text: 'Product has been updated successfully!',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        }).finally(()=>{
          this.form.reset();
          this.ngOnInit();
          this.dialogRef.closeAll();
        })
      }
    })
  }

  ngOnInit(): void {
   console.log(this.data);
  }
}
