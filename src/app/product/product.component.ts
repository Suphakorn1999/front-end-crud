import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { ProductModel } from '../model/product.model';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  
  form: FormGroup;
  products:Array<ProductModel>=[];

  constructor(private fb: FormBuilder,private httpClient:HttpClient,private dialogRef:MatDialog) {
    this.form = this.fb.group({
      name: [''],
      price: [''],
      description: [''],
    });
  }


  onSubmit() {
    this.httpClient.post('http://localhost:8082/product/create',this.form.value).subscribe((data)=>{
      if(data){
        Swal.fire({
          title: 'Success!',
          text: 'Product has been created successfully!',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        }).finally(()=>{
          this.form.reset();
          this.ngOnInit();
        })
      }
    })
  }

  onEdit(product:ProductModel){
    this.dialogRef.open(ModalComponent,{
      data:product,
    })

    this.dialogRef.afterAllClosed.subscribe(()=>{
      this.ngOnInit();
    })
  }

  onDelete(product:ProductModel){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this product!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it.',
    }).then((result)=>{
      if(result.value){
        this.httpClient.delete('http://localhost:8082/product/delete/'+product.id).subscribe((data)=>{
          if(data){
            Swal.fire({
              title: 'Success!',
              text: 'Product has been deleted successfully!',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false,
            }).finally(()=>{
              this.ngOnInit();
            })
          }
        })
      }
    })
  }

  ngOnInit(): void {
    this.httpClient.get('http://localhost:8082/product/getAll').subscribe((data)=>{
      this.products = <Array<ProductModel>>data;
    })
  }
}

