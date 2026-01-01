import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { NodesService } from '../../../core/services/nodes.service';
import { ToastService } from '../../../core/utils/toast-service.service';
import { Node } from '../../../models/node.model';

@Component({
  selector: 'app-add-node',
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './add-node.component.html',
  styleUrl: './add-node.component.css'
})
export class AddNodeComponent {

  formNode: FormGroup
  errors? : string[]
  loading: boolean= false
  mode:'add' | 'edit'
  node?:Node

  constructor(private dialogRef: DialogRef<Node>,
      private nodeService: NodesService,
      private formBuilder : FormBuilder,
       @Inject(DIALOG_DATA) private data: { mode: 'add' | 'edit'; node?: Node },
      private toast : ToastService){
        this.mode = data.mode
        this.node = data.node
        this.formNode = this.formBuilder.group({
          tag : ['', Validators.required],
          activity :[null,
                      Validators.compose([
                        Validators.required,
                        Validators.min(0),
                        Validators.max(1)
                      ])],
          interaction : [null,
                      Validators.compose([
                        Validators.required,
                        Validators.min(1)
                      ])]
        })

         if (this.mode === 'edit' && this.node) {
          this.formNode.patchValue({
            tag: this.node.tag,
            activity: this.node.activity,
            interaction: this.node.interaction
          });
        }
      }


  save(): void{
    if(this.formNode.invalid){
      this.formNode.markAllAsTouched()
      console.log('something is happening')
      console.log(this.formNode.value.tag,this.formNode.value.activity,this.formNode.value.interaction)
      this.errors=['Invalid input entry. Please verify your input']
      return;
    }
    console.log('creation started')
    console.log(this.formNode.value.tag,this.formNode.value.activity,this.formNode.value.interaction)
    this.loading= true;
    this.errors= [];
    const {tag, activity, interaction} = this.formNode.value
    if(this.mode==='add'){

      this.nodeService.addNode(tag,activity,interaction).subscribe({
          next:node =>{
            this.toast.info(`Node ${node.tag} successfully added`);
            this.loading=false;
            this.dialogRef.close()
          },
          error:(err) =>{
            if(err.status==='400'){
              this.errors =[err?.detail]
            }
            this.loading=false;
            this.toast.error("Failed to add Node to graph");
            this.errors=[`Node with tag:${tag} may exist already in this graph`]
          }
        })
    }
    if(this.mode==='edit'){
      if(!this.node?.id) {
        console.log(`update node id is missing`)
        return;
      }
      console.log('update operation')
      this.nodeService.editNode(this.node?.id,tag,activity,interaction).subscribe({
        next:res=>{
          console.log(`node:`,res);
          this.toast.info(`Node: ${res.tag} updated successfully`);
          this.loading=false;
          this.dialogRef.close()
        },
        error:(err) =>{
            if(err.status==='400'){
              this.errors =[err?.detail]
            }
            this.loading=false;
            this.toast.error("Failed to add Node to graph");
            this.errors=[`Node with tag:${tag} may exist already in this graph`]
          }
      })
    }

  }
  cancel(){
    this.dialogRef.close()
  }

  delete(id:number){
    if(!id){
      console.log(`node id is missing`)
      return;
    }
    this.nodeService.deleteNode(id).subscribe({
      next:()=>{
          this.toast.info(`Node deleted successfully`)
          this.dialogRef.close();
          window.location.reload()
      },
      error:()=>{
        console.log(`something goes wrong`)
        this.errors=[`something goes wrong - delete operation failed`]
      }
    })
  }
}
